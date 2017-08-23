import { combineReducers } from 'redux';
import activeScene from './activeSceneReducer.js';
import activeStructure from './activeStructureReducer.js';
import scenes from './scenesReducer.js';
import ui from './uiReducer.js';
import SVModal from './svModalReducer.js';
import editor from './editorReducer.js';
import activeTile from './activeTileReducer.js';

const rootReducer = combineReducers({
  scenes,
  activeScene,
  activeStructure,
  activeTile,
  ui,
  SVModal,
  editor
});

export default rootReducer;
