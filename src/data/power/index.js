import {parseCSV} from '../../helpers/format.js';
const defaultLoad = require('./defaultLoad.csv');
const solar = require('./solar.csv');

export default {
  defaultLoad: defaultLoad.map(parseCSV),
  solar: solar.map(parseCSV)
};
