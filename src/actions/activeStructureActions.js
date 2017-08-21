import * as types from '../constants/actionTypes.js';

export function setActiveStructure (structure) {
  return {
    type: types.SET_ACTIVE_STRUCTURE,
    payload: structure
  };
}
