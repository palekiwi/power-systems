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

const rootReducer = combineReducers({
  scenes
});

export default rootReducer;
