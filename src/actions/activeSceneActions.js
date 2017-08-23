import * as types from '../constants/actionTypes.js';

const emptyScene = {
  name: '',
  terrainTiles: [],
  structureTiles: [],
  gridSize: [0,0]
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

export function toggleStructureActive (idx) {
  return {
    type: types.TOGGLE_STRUCTURE_ACTIVE,
    payload: idx
  };
}

export function setEmptyActiveScene () {
  return {
    type: types.SET_EMPTY_ACTIVE_SCENE,
    payload: emptyScene
  };
}

export function setGridSize (array) {
  return {
    type: types.SET_GRID_SIZE,
    payload: array
  };
}
