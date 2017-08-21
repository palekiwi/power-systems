import { combineReducers } from 'redux';
import activeScene from './activeSceneReducer.js';
import scenes from './scenesReducer.js';

const rootReducer = combineReducers({
  scenes,
  activeScene
});

export default rootReducer;
