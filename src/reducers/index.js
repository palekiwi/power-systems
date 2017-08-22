import { combineReducers } from 'redux';
import activeScene from './activeSceneReducer.js';
import activeStructure from './activeStructureReducer.js';
import scenes from './scenesReducer.js';
import ui from './uiReducer.js';
import SVModal from './svModalReducer.js';

const rootReducer = combineReducers({
  scenes,
  activeScene,
  activeStructure,
  ui,
  SVModal
});

export default rootReducer;
