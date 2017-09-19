/* eslint-disable no-console */
const R = require('ramda');
const S = require('sanctuary');
import {addStorage, addBuffer} from './helpers/power-helpers.js';

// Object -> [a] -> [b] -> [c]
export function computeOutput (powerData, dates, data) {

  // [Object]
  const DATES = dates;

  // Object
  let TYPES = ['load', 'variable', 'base', 'battery', 'grid', 'backup'];
  let HASH = R.zipObj(
    TYPES,
    R.map(t =>
      R.compose(
        R.indexBy(R.prop('id')),
        R.always(R.filter(R.propEq('type', t), data))
      )(t),
      TYPES
    )
  );

  const SYSTEM_CAPACITY = R.compose(
    R.sum,
    R.pluck('capacity'),
    R.filter(R.propEq('category', 'generator'))
  )(data);

  const VARIABLE_CAPACITY = R.compose(
    R.sum,
    R.pluck('capacity'),
    R.filter(R.propEq('type', 'variable'))
  )(data);

  const EMPTY = R.assoc('stat', {}, R.zipObj(
    R.pluck('id', data),
    R.map(R.always([]), data)
  ));

  // (a -> b -> c -> d) -> [e]
  const reducer = (acc, val, i) => R.mergeWith(
    R.append,
    computeCycle(acc, val, i),
    acc
  );

  const computeCycle = (acc, date, i) => {
    let sumBy = field => R.compose(R.sum, R.pluck(field), R.values);
    let round = x => Math.round(x * 1000);

    let energy = (id, field, curr) => R.compose(
      R.ifElse(R.always(i == 0),
        R.always(round(curr / 12)),
        x => round(R.mean([R.last(x[id])[field], curr]) / 12)
      )
    )(acc);

    let load = R.map(x => {
      let power = x.capacity * powerData[x.variation][i].value;
      return {
        date,
        power,
        energy: energy(x.id, 'power', power)
      };
    }, HASH.load);

    let variable = R.map(x => {
      let power = x.capacity * powerData[x.variation][i].value;
      return {
        date,
        power,
        energy: energy(x.id, 'power', power)
      };
    }, HASH.variable);

    let totalLoad = sumBy('power')(load);
    let totalLoadEnergy = sumBy('energy')(load);
    let totalVariable = sumBy('power')(variable);
    let totalVarEnergy = sumBy('energy')(variable);

    // needed to compute buffering
    let lastRawVariable = R.compose(
      S.fromMaybe(totalVariable),
      R.map(R.sum),
      S.sequence(S.Maybe),
      R.map(R.pluck('power')),
      R.map(
        R.compose(
          S.last,
          R.prop(R.__, acc)
        )
      ),
      R.keys
    )(HASH.variable);

    // the total of power from variable sources at last gime mark
    let lastVariable = R.compose(
      S.fromMaybe(totalVariable),
      R.map(R.sum),
      S.sequence(S.Maybe),
      R.map(R.pluck('power')),
      R.map(
        R.compose(
          S.last,
          R.prop(R.__, acc)
        )
      ),
      R.keys,
      R.filter(R.prop('buffer'))
    )(HASH.battery);

    let buffer1 = R.compose(
      bs => {
        let units = R.keys(bs).length;
        let meanRamp = R.mean(R.pluck('ramp', R.values(bs)));                                    // mean ramp value of all units
        let ramp = meanRamp * VARIABLE_CAPACITY;                                                 // required ramp rate
        let targetTotalPower = R.clamp(lastVariable - ramp, lastVariable + ramp)(totalVariable); // target ramp power output
        let targetTotalEnergy = round(R.mean([lastVariable, targetTotalPower]) / 12);            // target ramped energy output over 5min period
        let targetBuffered = (totalVarEnergy - targetTotalEnergy) / units;                       // target buffered energy

        return R.map(
          b => {
            let balance = (i > 0) ? R.last(acc[b.id]).balance : b.soc * b.capacity * 1000;           // mutliply by 1000 to convert from kWh to Wh
            let c = b.capacity * 1000 * b.c / 60 * 5;

            let buffered = R.compose(
              R.clamp(0 - balance, b.capacity * 1000 - balance), // clamp by capacity
              R.clamp(-c, c)                                     // clamp by C-rating
            )(targetBuffered);

            let power = buffered == targetBuffered ?
              (targetTotalPower / units) :
              (buffered == 0 && (balance == 0 || balance == b.capacity * 1000)) ? (totalVariable / units) :
              (((totalVarEnergy / units) - buffered) * 2 * 12 / 1000) - (lastRawVariable / units); // calculate instant power from buffered energy
            let buffer = totalVariable / units - power;
            let energy = totalVarEnergy / units - buffered;

            return {
              date,
              buffered,
              balance: balance + buffered,
              power,
              buffer,
              energy
            };
          }
        )(bs);
      },
      R.filter(R.prop('buffer'))
    )(HASH.battery);

    let buffer = getBuffer(i, date, acc, HASH.battery, VARIABLE_CAPACITY, lastVariable, totalVariable, totalVarEnergy);

    let totalBuffer = sumBy('buffer')(buffer);
    let totalBufferedEnergy = sumBy('buffered')(buffer);

    let base = R.map(
      b => {
        let units = R.keys(HASH.base).length;
        let powerShare = (totalLoad - (totalVariable - totalBuffer)) / units;
        let clampBase = R.clamp(b.capacity * b.base, b.capacity);
        let ramp = b.ramp * b.capacity;

        let lastPower = R.compose(
          clampBase,
          S.fromMaybe(powerShare),
          S.map(R.prop('power')),
          S.last
        )(acc[b.id]);

        let power = R.compose(
          clampBase,
          R.clamp(lastPower - ramp, lastPower + ramp)
        )(powerShare);

        return {date, power, energy: energy(b.id, 'power', power)};
      },
      HASH.base
    );

    let totalBase = sumBy('power')(base);
    let totalBaseEnergy = sumBy('energy')(base);

    let storage = R.compose(
      ss => {
        let units = R.keys(ss).length;
        let targetPower = ((totalVariable - totalBuffer) + totalBase - totalLoad) / units;
        let targetEnergy = ((totalVarEnergy - totalBufferedEnergy) + totalBaseEnergy - totalLoadEnergy) / units;
        return R.map(s => {
          let balance = buffer[s.id] ? // read balance from the same battery in this cycle if exists
            buffer[s.id].balance :
            (i > 0) ?
            R.last(acc[s.id]).balance :
            s.capacity * 1000 * s.soc;

          let c = s.capacity * 1000 * s.c / 12; // 5min charge and discharge limit

          let stored = R.compose(
            R.clamp(0 - balance, s.capacity * 1000 - balance), // clamp by capacity
            R.clamp(-c, c)                                     // clamp by C-rating
          )(targetEnergy);

          let target = targetEnergy == stored;

          //let storage = target ? targetPower : (i == 0 || stored == 0 && (balance == 0 || balance == s.capacity * 1000)) ? 0 : (stored * 2 * 12 / 1000) - R.last(acc[s.id]).storage; // convert energy to power
          let storage = target ? targetPower :
            //i == 0 ? ((targetEnergy - stored) * 2 * 12 / 1000) - targetPower :
            (balance + target) <= 0 || (balance + target) >= s.capacity * 1000 ? 0 :
            i == 0 ? 0 :
            (stored == 0 && (balance == 0 || balance == s.capacity * 1000)) ? 0 :
            (stored * 2 * 12 / 1000) - R.last(acc[s.id]).storage; // convert energy to power

          return {
            date,
            storage,
            stored,
            balance: balance + stored
          };
        }, ss);
      },
      R.filter(R.prop('storage'))
    )(HASH.battery);

    let totalStorage = sumBy('storage')(storage);

    let grid = R.map(
      g => {
        let units = R.keys(HASH.grid).length;
        let powerShare = (totalLoad - (totalVariable - totalBuffer)  - totalBase + totalStorage) / units;
        let power = R.clamp(0, R.identity)(powerShare);

        return {date, power, energy: energy(g.id, 'power', power)};
      },
      HASH.grid
    );

    let totalGrid = sumBy('power')(grid);

    let backupLoad = (totalLoad - (totalVariable - totalBuffer)  - totalBase + totalStorage - totalGrid);
    let backup = getBackup(date, acc, energy, backupLoad, HASH.backup);

    let battery = R.mergeWith(R.merge, buffer, storage);

    return R.mergeAll([load, variable, battery, base, grid, backup, {stat: 'sisiak'}]);
  };

  const result = R.addIndex(R.reduce)(reducer, EMPTY, DATES);

  return result;
}

function getAgg (data, res, pred, field, f) {
  return R.compose(
    R.sum,
    R.map(R.compose(
      R.reduce(f, 0),
      R.pluck(field),
      x => res[x.id]
    )),
    R.filter(pred)
  )(data);
}

function getBackup (date, acc, energy, load, items) {
  return R.map(
    b => {
      let units = R.keys(items).length;
      let powerShare = load / units;
      let clampBase = R.clamp(b.capacity * b.base, b.capacity);
      let clampBounds = R.clamp(0, b.capacity);
      let ramp = b.ramp * b.capacity;

      let lastPower = R.compose(
        S.fromMaybe(powerShare),
        S.map(R.prop('power')),
        S.last
      )(acc[b.id]);

      let power = R.compose(
        R.ifElse(R.always(lastPower == 0),
          clampBounds,
          R.compose(
            clampBase,
            R.clamp(lastPower - ramp, lastPower + ramp)
          )
        )
      )(powerShare);

      return {date, power, energy: energy(b.id, 'power', power)};
    },
    items
  );
}

function getBuffer (i, date, acc, items, capacity, lastPower, currPower, currEnergy) {
  return R.compose(
    bs => {
      let units = R.keys(bs).length;
      let meanRamp = R.mean(R.pluck('ramp', R.values(bs)));                                    // mean ramp value of all units
      let ramp = meanRamp * capacity;                                                          // required ramp rate
      let targetTotalPower = R.clamp(lastPower - ramp, lastPower + ramp)(currPower);           // target ramp power output
      let targetTotalEnergy = Math.floor(R.mean([lastPower, targetTotalPower]) / 12 * 1000);               // target ramped energy output over 5min period
      let targetBuffered = (currEnergy - targetTotalEnergy) / units;                           // target buffered energy

      return R.map(
        b => {
          let balance = (i > 0) ? R.last(acc[b.id]).balance : b.soc * b.capacity * 1000;           // mutliply by 1000 to convert from kWh to Wh
          let c = b.capacity * 1000 * b.c / 60 * 5;

          let prebuffered = R.compose(
            R.clamp(0 - balance, b.capacity * 1000 - balance), // clamp by capacity
            R.clamp(-c, c)                                     // clamp by C-rating
          )(targetBuffered);

          let buffer;
          let stop = false;
          if (prebuffered == targetBuffered) {
            buffer = (currPower - targetTotalPower) / units;
          } else if (i == 0 || (prebuffered == 0 && (balance == 0 || balance == b.capacity * 1000))) {
            buffer = 0;
          } else if (Math.abs(prebuffered * 2 * 12 / 1000) - R.last(acc[b.id]).buffer < 0) { // not enough energy to output over a 5m interval
            buffer = 0;
            stop = true;
          } else {
            buffer = (prebuffered * 2 * 12 / 1000) - R.last(acc[b.id]).buffer;
          }

          let buffered = stop ? 0 : prebuffered;
          let power = currPower / units - buffer;
          let energy = currEnergy / units - buffered;

          return {
            date,
            buffered,
            balance: balance + buffered,
            power,
            buffer,
            energy
          };
        }
      )(bs);
    },
    R.filter(R.prop('buffer'))
  )(items);
}
