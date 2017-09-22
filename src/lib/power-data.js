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

  const VARIABLE_CAPACITY = R.compose(
    R.sum,
    R.pluck('capacity'),
    R.filter(R.propEq('type', 'variable'))
  )(data);

  const EMPTY = R.merge(
    {totalLoad: [], totalGen: [], totalFeed: [], totalRamped: [], consumption: [], production: [], energyBalance: [], powerBalance: [], totalStorage: [], totalBuffer: [], min: [], max: []},
    R.zipObj(
      R.pluck('id', data),
      R.map(R.always([]), data)
    )
  );

  // (a -> b -> c -> d) -> [e]
  const reducer = (acc, val, i) => R.mergeWith(
    R.append,
    computeCycle(acc, val, i, HASH, powerData, VARIABLE_CAPACITY),
    acc
  );

  const result = R.addIndex(R.reduce)(reducer, EMPTY, DATES);

  result.minPower = result.min.reduce(R.minBy(R.prop('power'))).power;
  result.maxPower = result.max.reduce(R.maxBy(R.prop('power'))).power;
  result.totalConsumption = R.compose(R.sum, R.pluck('energy'))(result.consumption);
  result.totalProduction = R.compose(R.sum, R.pluck('energy'))(result.production);
  result.netEnergy = R.compose(R.sum, R.pluck('energy'))(result.energyBalance);

  return result;
}

function computeCycle (acc, date, i, hash, powerData, capacity) {
  const sumBy = field => R.compose(R.sum, R.pluck(field), R.values);
  const round = x => Math.round(x * 1000);

  const getEnergy = (id, field, curr) => R.compose(
    R.ifElse(R.always(i == 0),
      R.always(round(curr / 12)),
      x => round(R.mean([R.last(x[id])[field], curr]) / 12)
    )
  )(acc);

  const getTotal = (i, acc, id, energy) => i > 0 ? energy + R.last(acc[id]).total : energy;

  const load =  getLoad(i, date, acc, hash.load, getEnergy, getTotal, powerData);
  const totalLoad = sumBy('power')(load);
  const totalLoadEnergy = sumBy('energy')(load);

  const variable = getVariable(i, date, acc, hash.variable, getEnergy, getTotal, powerData);
  const totalVariable = sumBy('power')(variable);
  const totalVarEnergy = sumBy('energy')(variable);
  const lastVariable = getLastVariable(acc, totalVariable, hash.battery);

  // the total of power from variable sources at last time mark
  const buffer = getBuffer(i, date, acc, hash.battery, capacity, lastVariable, totalVariable, totalVarEnergy);
  const totalBuffer = sumBy('buffer')(buffer);
  const totalBuffered = sumBy('buffered')(buffer);
  const totalRamped = sumBy('power')(buffer);
  const totalRampedEnergy = sumBy('energy')(buffer);

  const baseLoad = totalLoad - (totalVariable - totalBuffer);
  const base = getBase(i, date, acc, hash.base, getEnergy,getTotal, baseLoad);
  const totalBase = sumBy('power')(base);
  const totalBaseEnergy = sumBy('energy')(base);

  const storagePower = ((totalVariable - totalBuffer) + totalBase - totalLoad);
  const storageEnergy = ((totalVarEnergy - totalBuffered) + totalBaseEnergy - totalLoadEnergy);
  const storage = getStorage(i, date, acc, hash.battery, buffer, storagePower, storageEnergy);
  const totalStorage = sumBy('storage')(storage);
  const totalStored = sumBy('stored')(storage);

  const gridLoad = totalLoad - (totalVariable - totalBuffer)  - totalBase + totalStorage;
  const grid = getGrid(i, date, acc, hash.grid, getEnergy, getTotal, gridLoad);
  const totalGrid = sumBy('power')(grid);
  const totalGridEnergy = sumBy('energy')(grid);

  const backupLoad = (totalLoad - (totalVariable - totalBuffer)  - totalBase + totalStorage - totalGrid);
  const backup = getBackup(i, date, acc, getEnergy, getTotal, backupLoad, hash.backup);
  const totalBackup = sumBy('power')(backup);
  const totalBackupEnergy = sumBy('energy')(backup);

  const battery = R.mergeWith(R.merge, buffer, storage);
  const totalGen = totalVariable + totalBase + totalBackup;
  const totalFeed = totalVariable + totalBase + totalBackup - totalBuffer - totalStorage;
  const totalProduction = totalVarEnergy + totalBaseEnergy + totalBackupEnergy;
  const totalConsumption = totalLoadEnergy;
  const powerBalance = totalLoad - totalFeed;
  const energyBalance = totalRampedEnergy + totalBaseEnergy + totalGridEnergy + totalBackupEnergy - totalLoadEnergy - totalStored;

  const stat = {
    totalLoad: {date, power: totalLoad},
    totalGen: {date, power: totalGen},
    totalFeed: {date, power: totalFeed},
    totalRamped: {date, power: totalRamped},
    totalBuffer: {date, buffer: totalBuffer},
    totalStorage: {date, storage: totalStorage},
    powerBalance: {date, power: powerBalance},
    energyBalance: {date, energy: energyBalance},
    production: {date, energy: totalProduction},
    consumption: {date, energy: totalConsumption},
    min: {power: R.min(totalBuffer, totalStorage)},
    max: {power: R.max(totalLoad, totalGen)}
  };

  return R.mergeAll([load, variable, battery, base, grid, backup, stat]);
}

function getLoad (i, date, acc, items, getEnergy, getTotal, powerData) {
  return R.map(x => {
    let power = x.capacity * powerData[x.variation][i].value;
    let energy = getEnergy(x.id, 'power', power);
    return {
      date,
      power,
      energy,
      total: getTotal(i, acc, x.id, energy)
    };
  }, items);
}

function getVariable (i, date, acc, items, getEnergy, getTotal, powerData) {
  return R.map(x => {
    let power = x.capacity * powerData[x.variation][i].value;
    let energy = getEnergy(x.id, 'power', power);
    return {
      date,
      power,
      energy,
      total: getTotal(i, acc, x.id, energy)
    };
  }, items);
}

function getLastVariable (acc, defaultVal, batteries) {
  return R.compose(
    S.fromMaybe(defaultVal),
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
  )(batteries);
}

function getBackup (i, date, acc, getEnergy, getTotal, load, items) {
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

      let energy = getEnergy(b.id, 'power', power);

      return {
        date,
        power,
        energy,
        total: getTotal(i, acc, b.id, energy)
      };
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
          } else if (Math.abs(prebuffered * 2 * 12 / 1000) - Math.abs(R.last(acc[b.id]).buffer) < 0) { // not enough energy to output over a 5m interval
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

function getStorage (i, date, acc, items, buffer, currPower, currEnergy) {
  return R.compose(
    ss => {
      let units = R.keys(ss).length;
      let targetEnergy = currEnergy / units;
      return R.map(s => {
        let balance = buffer[s.id] ? // read balance from the same battery in this cycle if exists
          buffer[s.id].balance :
          (i > 0) ?
          R.last(acc[s.id]).balance :
          s.capacity * 1000 * s.soc;

        let c = s.capacity * 1000 * s.c / 12; // 5min charge and discharge limit

        let prestored = R.compose(
          R.clamp(0 - balance, s.capacity * 1000 - balance), // clamp by capacity
          R.clamp(-c, c)                                     // clamp by C-rating
        )(targetEnergy);

        let storage;
        let stop = false;
        if (prestored == targetEnergy) {
          storage = currPower / units;
        } else if (i == 0 || (prestored == 0 && (balance == 0 || balance == s.capacity * 1000))) {
          storage = 0;
        } else if (Math.abs(prestored * 2 * 12 / 1000) - R.last(acc[s.id]).buffer < 0) { // not enough energy to output over a 5m interval
          storage = 0;
          stop = true;
        } else {
          storage = (prestored * 2 * 12 / 1000) - R.last(acc[s.id]).storage;
        }

        let stored = stop ? 0 : prestored;

        return {
          date,
          storage,
          stored,
          balance: balance + stored
        };
      }, ss);
    },
    R.filter(R.prop('storage'))
  )(items);
}

function getBase (i, date, acc, items, getEnergy, getTotal, currPower) {
  return R.map(
    b => {
      let units = R.keys(items).length;
      let powerShare = currPower / units;
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

      let energy = getEnergy(b.id, 'power', power);

      return {
        date,
        power,
        energy,
        total: getTotal(i, acc, b.id, energy)
      };
    },
    items
  );
}

function getGrid (i, date, acc, items, getEnergy, getTotal, currPower) {
  return R.map(
    g => {
      let units = R.keys(items).length;
      let powerShare = currPower / units;
      let power = R.clamp(0, R.identity)(powerShare);
      let energy = getEnergy(g.id, 'power', power);

      return {
        date,
        power,
        energy,
        total: getTotal(i, acc, g.id, energy)
      };
    },
    items
  );
}
