import * as types from '../constants/actionTypes.js';

const emptyScene = {
  name: '',
  terrainTiles: [],
  structureTiles: [],
  gridSize: [3,3]
};

export function setActiveScene (scene) {
  return {
    type: types.SET_ACTIVE_SCENE,
    payload: scene
  };
}

export function sceneTogglePower (bool) {
  return {
    type: types.SCENE_TOGGLE_POWER,
    payload: bool
  };
}

export function toggleStructureActive (position) {
  return {
    type: types.TOGGLE_STRUCTURE_ACTIVE,
    payload: position
  };
}

export function setEmptyActiveScene () {
  return {
    type: types.SET_EMPTY_ACTIVE_SCENE,
    payload: emptyScene
  };
}

export function setGridSize (array) {
  return function (dispatch) {
    dispatch(adjustGridSize(array));
    dispatch(cropToGrid(array));
  };
}

export function adjustGridSize (array) {
  return {
    type: types.ADJUST_GRID_SIZE,
    payload: array
  };
}

export function cropToGrid (array) {
  return {
    type: types.CROP_TO_GRID,
    payload: array
  };
}

export function saveTile (payload) {
  return {
    type: types.SAVE_TILE,
    payload
  };
}

export function deleteTile (payload) {
  return {
    type: types.DELETE_TILE,
    payload
  };
}

export function setStructureCapacity (payload) {
  return {
    type: types.SET_STRUCTURE_CAPACITY,
    payload
  };
}
