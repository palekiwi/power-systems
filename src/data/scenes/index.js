import R from 'ramda';
import village from './village.js';
import coast from './coast.js';

const ss = [village, coast];
export default R.zipObj(R.pluck('name', ss), ss);
