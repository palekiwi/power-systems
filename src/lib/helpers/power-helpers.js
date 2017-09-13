import isEmpty from 'ramda/src/isEmpty';
import zipWith from 'ramda/src/zipWith';
import mergeWithKey from 'ramda/src/mergeWithKey';
import head from 'ramda/src/head';
import tail from 'ramda/src/tail';
import add from 'ramda/src/add';
import subtract from 'ramda/src/subtract';

const zipFieldsWith = field => fn => (a,b) => {
  if (isEmpty(a) && isEmpty(b)) return [];
  if (isEmpty(a)) return b;
  if (isEmpty(b)) return a;
  return zipWith(mergeWithKey((k,l,r) => k == field ? fn(l, r) : r), a, b);
};

const zipPower = zipFieldsWith('power');
const zipBuffer = zipFieldsWith('buffer');
const zipStorage = zipFieldsWith('storage');

const zipPowerSum = (acc, arr) => (arr.length == 0) ? acc : zipPowerSum(zipPower(add)(acc, head(arr)), tail(arr));
const zipPowerDiff = (acc, arr) => (arr.length == 0) ? acc : zipPowerDiff(zipPower(subtract)(acc, head(arr)), tail(arr));

const zipBufferSum = (acc, arr) => (arr.length == 0) ? acc : zipBufferSum(zipBuffer(add)(acc, head(arr)), tail(arr));
const zipStorageSum = (acc, arr) => (arr.length == 0) ? acc : zipStorageSum(zipStorage(add)(acc, head(arr)), tail(arr));

const zipRec = fn => arr => (arr.length == 0) ? [] : fn(head(arr), tail(arr));

export const addPower = zipRec(zipPowerSum);
export const subPower = zipRec(zipPowerDiff);
export const addBuffer = zipRec(zipBufferSum);
export const addStorage = zipRec(zipStorageSum);
