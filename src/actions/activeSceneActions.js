import * as types from '../constants/actionTypes.js';

const emptyScene = {
  name: 'New System',
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

export function setSceneName (name) {
  return {
    type: types.SET_SCENE_NAME,
    payload: name
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

export function setStructureCapacity (index, field) {
  return {
    type: types.SET_STRUCTURE_CAPACITY,
    payload: {
      index,
      field
    }
  };
}

export function setStructureRamp (index, field) {
  return {
    type: types.SET_STRUCTURE_RAMP,
    payload: {
      index,
      field
    }
  };
}

export function setStructureBase (index, field) {
  return {
    type: types.SET_STRUCTURE_BASE,
    payload: {
      index,
      field
    }
  };
}

export function setStructureType (index, field) {
  return {
    type: types.SET_STRUCTURE_TYPE,
    payload: {
      index,
      field
    }
  };
}

export function saveNewScene (scene) {
  return {
    type: types.SAVE_NEW_SCENE,
    payload: scene
  };
}

export function updateScene (scene) {
  return {
    type: types.UPDATE_SCENE,
    payload: scene
  };
}
