const R = require('ramda');
const S = require('sanctuary');

// Object -> [a] -> [b] -> [c]
export function computeOutput (powerData, dates, data) {

  // [Object]
  const DATES = dates;

  // Object
  let TYPES = ['load', 'variable', 'base', 'battery'];
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
  const f = (acc, val, i) => R.mergeWith(
    R.append,
    computeCycle(i, acc),
    acc
  );

  const computeCycle = (i, acc) => {
    let load = R.map(x => ({power: x.capacity * powerData[x.variation][i]}), HASH.load);
    let variable = R.map(x => ({power: x.capacity * powerData[x.variation][i]}), HASH.variable);

    let totalLoad = R.compose(R.sum, R.pluck('power'), R.values)(load);
    let totalVariable = R.compose(R.sum, R.pluck('power'), R.values)(variable);

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
        return R.map(b =>
          R.compose(
            x => ({power: x / units, buffer: (totalVariable - x) / units}),
            x => R.clamp(lastVariable - x, lastVariable + x)(totalVariable)
          )(b.ramp * VARIABLE_CAPACITY)
        )(bs);
      },
      R.filter(R.prop('buffer'))
    )(HASH.battery);

    let totalBuffer = R.compose(R.sum, R.pluck('buffer'), R.values)(buffer);

    let base = R.map(
      b => {
        let units = R.keys(HASH.base).length;
        let powerShare = (totalLoad - (totalVariable - totalBuffer) / R.keys(HASH.base).length);
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

        return {power};
      },
      HASH.base
    );

    let totalBase = R.compose(R.sum, R.pluck('power'), R.values)(base);

    let storage = R.compose(
      ss => {
        let units = R.keys(ss).length;
        let powerBalance = (totalVariable - totalBuffer) + totalBase - totalLoad;
        return R.map(s => ({storage: powerBalance / units}), ss);
      },
      R.filter(R.prop('storage'))
    )(HASH.battery);

    return R.mergeAll([load, variable, R.mergeWith(R.merge, buffer, storage), base]);
  };

  return R.addIndex(R.reduce)(f, EMPTY, DATES);
}
