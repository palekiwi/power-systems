import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';
import R from 'ramda';

// operation that sets the value of active field in the data object of an array of objects
const mapActive = R.compose(
  R.map,
  R.assocPath(['active'])
);

// update operation of all structure tile objects of a scene
const toggleSceneActiveState = (bool, state) =>
  R.over(
    R.lensPath(['structureTiles']),
    mapActive(bool)
  )(state);

// lens that focuses on the active field of data object inside a strtucture tile
const activeLens = tileIdx =>
  R.compose(
    R.lensPath(['structureTiles']),
    R.lensIndex(tileIdx),
    R.lensPath(['active'])
  );

const toggleStructureActive = idx =>
  R.over(activeLens(idx), R.not);

export default function activeScene (state = initialState.activeScene, action) {
  switch (action.type) {

  case types.SET_ACTIVE_SCENE:
    return action.payload;

  case types.SCENE_TOGGLE_POWER:
    return toggleSceneActiveState(action.payload, state);

  case types.TOGGLE_STRUCTURE_ACTIVE:
    return state;

  default:
    return state;
  }
}
