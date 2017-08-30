/* eslint-disable no-console */
import { hourly } from './helpers/dateArrays.js';
import R from 'ramda';

const computeVariable = x => R.map(R.multiply(R.prop('capacity', x)), R.prop('variation', x));
const zipHourly = R.zipWith((date, val) => ({date, val}), hourly);
const setVariable = field => x => R.set(R.lensProp(field), R.compose(zipHourly, computeVariable)(x), x);
const setCons = setVariable('consumption');
const setOutput = setVariable('consumption');

export function computeSystemOutput (sts) {
  const consumers = sts
    .filter(R.propEq('class', 'consumer'))
    .map(setCons);

  const primary = sts
    .filter(R.propEq('priority', 2))
    .map(setOutput);

  const secondary = sts.filter(R.propEq('priority', 1));
  const backup = sts.filter(R.propEq('priority', 0));

  console.log(primary[0]);

  return sts;
}
