import {parseCSV} from '../../helpers/format.js';
const defaultLoad = require('./defaultLoad.csv');
const solar = require('./solar.csv');

/* eslint-disable no-console */
console.log(defaultLoad);
export default {
  defaultLoad: defaultLoad.map(parseCSV),
  solar: solar.map(parseCSV)
};
