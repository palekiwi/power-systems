import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';
import { sortTiles } from '../lib/tile.js';
import over from 'ramda/src/over';
import set from 'ramda/src/set';
import compose from 'ramda/src/compose';
import lensPath from 'ramda/src/lensPath';
import lensIndex from 'ramda/src/lensIndex';
import map from 'ramda/src/map';
import assocPath from 'ramda/src/assocPath';
import append from 'ramda/src/append';
import not from 'ramda/src/not';

// operation that sets the value of active field in the data object of an array of objects
const mapActive = compose(
  map,
  assocPath(['active'])
);

// update operation of all structure tile objects of a scene
const toggleSceneActiveState = (bool, state) =>
  over(
    lensPath(['structureTiles']),
    mapActive(bool)
  )(state);

// lens that focuses on the active field of data object inside a strtucture tile
const activeLens = tileIdx =>
  compose(
    lensPath(['structureTiles']),
    lensIndex(tileIdx),
    lensPath(['active'])
  );

const toggleStructureActive = idx =>
  over(activeLens(idx), not);

const saveTile = (action, state) => {
  const {type, position, tile} = action.payload;
  const idx = state[type].findIndex(t => t.position.equals(position));
  if (idx < 0) {
    return assocPath(
      [type],
      compose(sortTiles, append(tile))(state[type])
    )(state);
  } else {
    const tileLens = compose(
      lensPath([type]),
      lensIndex(idx)
    );
    return set(tileLens, tile)(state);
  }
};


export default function activeScene (state = initialState.activeScene, action) {
  switch (action.type) {

  case types.SET_ACTIVE_SCENE:
    return action.payload;

  case types.SET_EMPTY_ACTIVE_SCENE:
    return action.payload;

  case types.SCENE_TOGGLE_POWER:
    return toggleSceneActiveState(action.payload, state);

  case types.TOGGLE_STRUCTURE_ACTIVE:
    return toggleStructureActive(action.payload)(state);

  case types.SET_GRID_SIZE:
    return assocPath(['gridSize'], action.payload)(state);

  case types.SAVE_TILE:
    return saveTile(action, state);

  default:
    return state;
  }
}
