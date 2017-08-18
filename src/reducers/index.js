import { combineReducers } from 'redux';
import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';
import R from 'ramda';

// operation that sets the value of active field in the data object of an array of objects
const mapActive = R.compose(
  R.map,
  R.assocPath(['active'])
);

// update operation of all structure tile objects of a scene
const toggleSceneActiveState = bool =>
  R.over(R.lensPath(['structureTiles']), mapActive(bool)
);

const scenes = (state = initialState.scenes, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

const activeScene = (state = initialState.activeScene, action) => {
  switch (action.type) {
  case types.SET_ACTIVE_SCENE:
    return action.scene;
  case types.SCENE_TOGGLE_POWER:
    return toggleSceneActiveState(action.value, state);
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  scenes,
  activeScene
});

export default rootReducer;

// lens that focuses on the active field of data object inside a strtucture tile
const activeLens = activeIdx => compIdx => R.compose(
  R.lensIndex(activeIdx),
  R.lensPath(['structureTiles']),
  R.lensIndex(compIdx),
  R.lensPath(['data', 'active'])
);

