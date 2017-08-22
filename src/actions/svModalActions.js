import * as types from '../constants/actionTypes.js';

export function openSVModal (position = [0,0]) {
  return {
    type: types.OPEN_SYSTEM_VIEWER_MODAL,
    payload: position
  };
}

export function closeSVModal (position = [0,0]) {
  return {
    type: types.CLOSE_SYSTEM_VIEWER_MODAL,
    payload: position
  };
}
