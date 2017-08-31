/* eslint-disable no-console */
import R from 'ramda';

// StructureTile -> (a -> b)
const computeVariablePower = x => R.map(R.evolve({value: R.multiply(R.prop('capacity', x))}), R.prop('variation', x));
const setPower = fn => x => R.set(R.lensProp('power'), fn(x), x);
const setPowerVar = setPower(computeVariablePower);

const power = R.pluck('power');
const zipValuesWith = fn => R.zipWith(R.mergeWithKey((k,l,r) => k == 'value' ? fn(l, Math.abs(r)) : r));
const zipSum = (acc, arr) => (arr.length == 0) ? acc : zipSum(zipValuesWith(R.add)(acc, R.head(arr)), R.tail(arr));
const zipDiff = (acc, arr) => (arr.length == 0) ? acc : zipDiff(zipValuesWith(R.subtract)(acc, R.head(arr)), R.tail(arr));

const zipRec = fn => arr => (arr.length == 0) ? [] : fn(R.head(arr), R.tail(arr));
const addValues = zipRec(zipSum);
const subValues = zipRec(zipDiff);

export function computeSystemOutput (sts) {
  const consumers = sts
    .filter(R.propEq('class', 'consumer'))
    .map(setPowerVar);

  const primary = sts
    .filter(R.propEq('priority', 2))
    .map(setPowerVar);

  const load = addValues(power(consumers));
  const primaryPower = addValues(power(primary));

  const secondary = sts.filter(R.propEq('priority', 1));
  const backup = sts.filter(R.propEq('priority', 0));

  console.log(subValues([load, primaryPower]));

  return R.reduce(R.concat, [], [consumers, primary, secondary, backup]);
}
