import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';

export default function activeStructure (state = initialState.activeStructure, action) {
  switch (action.type) {

  case types.SET_ACTIVE_STRUCTURE:
    return action.payload;

  case types.CLOSE_SYSTEM_VIEWER_MODAL:
    return null;

  default:
    return state;
  }
}
