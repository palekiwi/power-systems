import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';
import append from 'ramda/src/append';

export default function scenes(state = initialState.scenes, action) {
  switch (action.type) {

  case types.SAVE_SCENE:
    return append(action.payload, state);

  default:
    return state;
  }
}
