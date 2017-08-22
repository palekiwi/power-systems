import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';
import R from 'ramda';

export default function editor(state = initialState.editor, action) {
  switch (action.type) {

  case types.TOGGLE_EDITOR:
    return R.not(state);

  case types.EDITOR_ON:
  case types.SET_EMPTY_ACTIVE_SCENE:
    return true;

  case types.EDITOR_OFF:
  case types.SET_ACTIVE_SCENE:
    return false;

  default:
    return state;
  }
}
