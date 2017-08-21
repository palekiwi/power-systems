import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';

export default function activeStructure (state = initialState.activeStructure, action) {
  switch (action.type) {
  case types.SET_ACTIVE_STRUCTURE:
    return action.payload;
  default:
    return state;
  }
}
