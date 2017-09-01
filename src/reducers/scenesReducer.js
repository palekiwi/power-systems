import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';
import append from 'ramda/src/append';

export default function scenes(state = initialState.scenes, action) {
  switch (action.type) {

  case types.SAVE_NEW_SCENE:
    return append(action.payload, state);

  case types.UPDATE_SCENE:
    return state;

  case types.DELETE_SCENE:
    return state;

  default:
    return state;
  }
}
