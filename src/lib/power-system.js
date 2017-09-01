/* eslint-disable no-console */
import R from 'ramda';

// StructureTile -> (a -> b)
const computeVariablePower = x => R.map(R.evolve({value: R.multiply(R.prop('capacity', x))}), R.prop('variation', x));
const setVariablePower = x => R.set(R.lensProp('power'), computeVariablePower(x), x);

const computeNonVarPower = load => cap => R.map(r => {
  if (r.value <= 0) return R.assoc('value', 0, r);
  return (r.value <= cap) ? r : R.assoc('value', cap, r);
}, load);

const setNonVarPower = load => x => R.set(R.lensProp('power'), computeNonVarPower(load)(R.prop('capacity', x)), x);

const power = R.pluck('power');
const zipValuesWith = fn => (a,b) => {
  if (R.isEmpty(a) && R.isEmpty(b)) return [];
  if (R.isEmpty(a)) return b;
  if (R.isEmpty(b)) return a;
  return R.zipWith(R.mergeWithKey((k,l,r) => k == 'value' ? fn(l, Math.abs(r)) : r), a, b);
};

const zipSum = (acc, arr) => (arr.length == 0) ? acc : zipSum(zipValuesWith(R.add)(acc, R.head(arr)), R.tail(arr));
const zipDiff = (acc, arr) => (arr.length == 0) ? acc : zipDiff(zipValuesWith(R.subtract)(acc, R.head(arr)), R.tail(arr));

const zipRec = fn => arr => (arr.length == 0) ? [] : fn(R.head(arr), R.tail(arr));
const addValues = zipRec(zipSum);
const subValues = zipRec(zipDiff);

export function computeSystemOutput (sts) {
  const consumers = sts
    .filter(R.propEq('class', 'consumer'))
    .map(setVariablePower);

  if (consumers.length == 0) return sts.map(R.assoc('power', null));

  const primary = sts.filter(R.propEq('priority', 2))
    .map(setVariablePower);

  const load0 = addValues(power(consumers));
  const primaryPower = addValues(power(primary));
  const load1 = subValues([load0, primaryPower]);

  const secondary = sts.filter(R.propEq('priority', 1))
    .map(setNonVarPower(load1));

  const secondaryPower = addValues(power(secondary));
  const load2 = subValues([load1, secondaryPower]);

  const backup = sts.filter(R.propEq('priority', 0))
    .map(setNonVarPower(load2));

  return R.unionWith(
    R.eqBy(R.prop('id')),
    R.unnest([consumers, primary, secondary, backup]),
    sts);
}
