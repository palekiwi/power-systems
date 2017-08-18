import { combineReducers } from 'redux';
import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';

const scenes = (state = initialState.scenes, action) => {
  switch (action.type) {
  case types.SCENE_POWER_ON:
    return state;
  default:
    return state;
  }
};

const activeScene = (state = initialState.activeScene, action) => {
  switch (action.type) {
  case types.SET_ACTIVE_SCENE:
    return action.scene;
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  scenes,
  activeScene
});

export default rootReducer;
