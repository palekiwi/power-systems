import {parseCSV} from '../../helpers/format.js';

export default {
  defaultLoad: require('./defaultLoad.csv').map(parseCSV),
  solar: require('./solar.csv').map(parseCSV)
};
