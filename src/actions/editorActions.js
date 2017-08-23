import * as types from '../constants/actionTypes.js';

export function toggleEditor () {
  return {
    type: types.TOGGLE_EDITOR
  };
}

export function editorOn () {
  return {
    type: types.EDITOR_ON
  };
}

export function editorOff () {
  return {
    type: types.EDITOR_OFF
  };
}

export function createNewScene () {
  return function (dispatch) {
    dispatch(editorOn());
  };
}
