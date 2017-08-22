import * as types from '../constants/actionTypes.js';

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
