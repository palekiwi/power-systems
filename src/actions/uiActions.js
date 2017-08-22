import * as types from '../constants/actionTypes.js';

export function resizePane () {
  return {
    type: types.RESIZE_PANE,
    payload: new Date()
  };
}
