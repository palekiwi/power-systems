import * as types from '../constants/actionTypes.js';

export function resizePane () {
  return {
    type: types.RESIZE_PANE,
    payload: new Date()
  };
}

export function openSVModal (position) {
  return {
    type: types.OPEN_SYSTEM_VIEWER_MODAL,
    payload: position
  };
}

export function closeSVModal () {
  return {
    type: types.CLOSE_SYSTEM_VIEWER_MODAL
  };
}
