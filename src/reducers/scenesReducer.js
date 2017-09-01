import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';
import append from 'ramda/src/append';
import propEq from 'ramda/src/propEq';
import update from 'ramda/src/update';

/* eslint-disable no-console */
const updateScene = (action, state) => {
  const idx = state.findIndex(propEq('id', action.payload.id));
  return update(idx, action.payload, state);
};

export default function scenes(state = initialState.scenes, action) {
  switch (action.type) {

  case types.SAVE_NEW_SCENE:
    return append(action.payload, state);

  case types.UPDATE_SCENE:
    return updateScene(action, state);

  case types.DELETE_SCENE:
    return state;

  default:
    return state;
  }
}
