import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';

export default function activeTile (state = initialState.activeTile, action) {
  switch (action.type) {

  case types.SET_ACTIVE_TILE:
    return action.payload;

  default:
    return state;
  }
}
