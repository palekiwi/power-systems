import isEmpty from 'ramda/src/isEmpty';
import zipWith from 'ramda/src/zipWith';
import mergeWithKey from 'ramda/src/mergeWithKey';
import head from 'ramda/src/head';
import tail from 'ramda/src/tail';
import add from 'ramda/src/add';
import subtract from 'ramda/src/subtract';

const zipValuesWith = fn => (a,b) => {
  if (isEmpty(a) && isEmpty(b)) return [];
  if (isEmpty(a)) return b;
  if (isEmpty(b)) return a;
  return zipWith(mergeWithKey((k,l,r) => k == 'value' ? fn(l, r) : r), a, b);
};

const zipSum = (acc, arr) => (arr.length == 0) ? acc : zipSum(zipValuesWith(add)(acc, head(arr)), tail(arr));
const zipDiff = (acc, arr) => (arr.length == 0) ? acc : zipDiff(zipValuesWith(subtract)(acc, head(arr)), tail(arr));

const zipRec = fn => arr => (arr.length == 0) ? [] : fn(head(arr), tail(arr));

export const addValues = zipRec(zipSum);
export const subValues = zipRec(zipDiff);
