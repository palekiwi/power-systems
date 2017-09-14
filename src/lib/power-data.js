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
    let totalVariable = sumBy('power')(variable);

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
        return R.map(b => {
          let ramp = b.ramp * VARIABLE_CAPACITY;
          let clamped = R.clamp(lastVariable - ramp, lastVariable + ramp)(totalVariable);
          let power = clamped / units;
          let buffer = (totalVariable - clamped) / units;
          let energy = batteryEnergy(b.id, 'buffer', buffer);
          return {
            date,
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

    let storage = R.compose(
      ss => {
        let units = R.keys(ss).length;
        let power = ((totalVariable - totalBuffer) + totalBase - totalLoad) / units;
        return R.map(s => ({
          date,
          storage: power,
          energy: batteryEnergy(s.id, 'storage', power)
        }), ss);
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

    let battery = R.mergeWith(R.mergeWithKey((k,l,r) => k == 'energy' ? R.add(l,r) : r), buffer, storage);

    return R.mergeAll([load, variable, battery, base, grid, backup]);
  };

  const result = R.addIndex(R.reduce)(reducer, EMPTY, DATES);
  return result;
}
