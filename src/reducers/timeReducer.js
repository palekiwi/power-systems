import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';

export default function time(state = initialState.time, action) {
  switch (action.type) {

  case types.SET_TIME:
    return action.payload;

  default:
    return state;
  }
}
