import * as types from '../constants/actionTypes.js';

export function setPowerData (payload) {
  return {
    type: types.SET_POWER_DATA,
    payload: payload
  };
}
