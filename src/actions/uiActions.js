import * as types from '../constants/actionTypes.js';

export function resizePane () {
  return {
    type: types.RESIZE_PANE,
    payload: new Date()
  };
}

export function setViewerMode (payload) {
  return {
    type: types.SET_VIEWER_MODE,
    payload: payload
  };
}
