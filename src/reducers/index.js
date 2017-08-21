import { combineReducers } from 'redux';
import activeScene from './activeSceneReducer.js';
import scenes from './scenesReducer.js';
import ui from './uiReducer.js';

const rootReducer = combineReducers({
  scenes,
  activeScene,
  ui
});

export default rootReducer;
