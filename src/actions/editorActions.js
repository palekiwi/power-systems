import * as types from '../constants/actionTypes.js';
import { setEmptyActiveScene } from './activeSceneActions.js';

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
    dispatch(setEmptyActiveScene());
  };
}

export function editScene () {
  return function (dispatch) {
    dispatch(editorOn());
  };
}
