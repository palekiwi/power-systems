/* eslint-disable no-console */
const R = require('ramda');
const S = require('sanctuary');

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

  const EMPTY = R.zipObj(
    R.pluck('id', data),
    R.map(R.always([]), data)
  );

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

    let batteryEnergy = (id, field, curr) => (i == 0 ? 0 : R.last(acc[id]).energy) + energy(id, field, curr);

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

    let buffer = R.compose(
      bs => {
        let units = R.keys(bs).length;
        return R.map(
          b => {
            let soc = (i > 0) ? R.last(acc[b.id]).balance : b.soc * b.capacity * 1000; // mutliply by 1000 to convert from kWh to Wh
            let c = b.capacity * 1000 * b.c / 60 * 5;
            let ramp = b.ramp * VARIABLE_CAPACITY; // required ramp rate

            let targetTotalPower = R.clamp(lastVariable - ramp, lastVariable + ramp)(totalVariable); // desired ramp power output
            let targetTotalEnergy = round(R.mean([lastVariable, targetTotalPower]) / 12); // desired ramped energy output
            let targetBuffered = (totalVarEnergy - targetTotalEnergy) / units; // desired buffered energy

            let bufferedAfterC = R.clamp(-c, c)(targetBuffered);
            let bufferedAfterSoC = R.clamp(0 - soc, b.capacity * 1000 - soc)(bufferedAfterC);

            let target = bufferedAfterSoC == targetBuffered;

            let power = target ? (targetTotalPower / units) : undefined; // convert energy to power
            let buffer = totalVariable / units - power;
            let energy = totalVarEnergy / units - bufferedAfterSoC;
            return {
              date,
              buffered: bufferedAfterSoC,
              balance: soc + bufferedAfterSoC,
              power,
              buffer,
              energy
            };
          }
        )(bs);
      },
      R.filter(R.prop('buffer'))
    )(HASH.battery);

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
          let soc = buffer[s.id] ? buffer[s.id].balance : s.capacity * 1000 * s.soc; // get from the same battery if exists
          let c = s.capacity * 1000 * s.c / 60 * 5; // 5min charge/discharge limit

          let storedAfterC = R.clamp(-c, c)(targetEnergy);
          let storedAfterSoC = R.clamp(0 - soc, s.capacity * 1000 - soc)(storedAfterC);

          let target = targetEnergy == storedAfterSoC;

          let storage = target ? targetPower : undefined; // convert energy to power

          return {
            date,
            storage,
            stored: storedAfterSoC,
            balance: soc + storedAfterSoC
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

    let backup = R.map(
      b => {
        let units = R.keys(HASH.backup).length;
        let powerShare = (totalLoad - (totalVariable - totalBuffer)  - totalBase + totalStorage - totalGrid) / units;
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
      HASH.backup
    );

    let battery = R.mergeWith(R.merge, buffer, storage);

    return R.mergeAll([load, variable, battery, base, grid, backup]);
  };

  const result = R.addIndex(R.reduce)(reducer, EMPTY, DATES);
  return result;
}
