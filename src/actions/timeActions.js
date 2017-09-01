import * as types from '../constants/actionTypes.js';

export function setTime (val) {
  return {
    type: types.SET_TIME,
    payload: val
  };
}
