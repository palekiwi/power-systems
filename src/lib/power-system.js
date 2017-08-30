import { hourly } from './helpers/dateArrays.js';
import R from 'ramda';

export function computeSystemOutput (sts) {
  const load = sts.filter(R.propEq('class', 'consumer'));
  /* eslint-disable no-console */
  console.log(R.map(setCons, load)[0]);
  return sts;
}

const computeCons = x => R.map(R.multiply(R.prop('capacity', x)), R.prop('variation', x));
const zipHourly = R.zipWith((date, val) => ({date, val}), hourly);
const consLens = R.lensProp('consumption');
const setCons = x => R.set(consLens, R.compose(zipHourly, computeCons)(x), x);
