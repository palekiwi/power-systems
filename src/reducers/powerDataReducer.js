import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';
import merge from 'ramda/src/merge';
import pluck from 'ramda/src/pluck';
import has from 'ramda/src/has';
import { computeOutput } from '../lib/power-data.js';
import data from '../data/power/index.js';

const dates = pluck('date', data.defaultLoad);

const savePowerData = (action, state) => {
  const p = action.payload;
  return merge(state, {[p.id]: computeOutput(data, dates, p.structureTiles)});
};

export default function powerData(state = initialState.powerData, action) {
  switch (action.type) {

  case types.SAVE_NEW_SCENE:
  case types.UPDATE_SCENE:
  case types.SET_POWER_DATA:
    return savePowerData(action, state);

  case types.SET_ACTIVE_SCENE:
    return has(action.payload.id, state) ? state : savePowerData(action, state);

  default:
    return state;
  }
}
