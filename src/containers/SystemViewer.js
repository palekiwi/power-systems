/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Scene from '../components/system-viewer/SceneEditor.js';
import R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from '../actions/uiActions.js';
import * as activeStructureActions from '../actions/activeStructureActions.js';
import * as svModalActions from '../actions/svModalActions.js';
import * as activeTileActions from '../actions/activeTileActions.js';
import * as activeSceneActions from '../actions/activeSceneActions.js';
import './SystemViewer.scss';

const actions = R.mergeAll([
  uiActions,
  svModalActions,
  activeStructureActions,
  activeTileActions,
  activeSceneActions
]);

SystemViewer.propTypes = {
  activeScene: PropTypes.object,
  ui: PropTypes.object,
  editor: PropTypes.bool,
  setActiveStructure: PropTypes.func.isRequired,
  setActiveTile: PropTypes.func.isRequired,
  resetActiveTile: PropTypes.func.isRequired,
  activeTile: PropTypes.object,
  saveTile: PropTypes.func.isRequired,
  openSVModal: PropTypes.func.isRequired,
  closeSVModal: PropTypes.func.isRequired
};

function SystemViewer (props) {

  return (
    <div className="SystemViewer">
      {R.isNil(props.activeScene) ?
        <div className="selection-prompt">
          Please select a system...
        </div>
        :
        <Scene
          name={props.activeScene.name}
          gridSize={props.activeScene.gridSize}
          terrainTiles={sortTiles(props.activeScene.terrainTiles)}
          structureTiles={sortTiles(props.activeScene.structureTiles)}
          openSVModal={props.openSVModal}
          closeSVModal={props.closeSVModal}
          setActiveStructure={props.setActiveStructure}
          setActiveTile={props.setActiveTile}
          resetActiveTile={props.resetActiveTile}
          activeTile={props.activeTile}
          saveTile={props.saveTile}
          resizePane={props.ui.resizePane}
          editor={props.editor}
        />
     }
    </div>
  );
}

const mapStateToProps = R.pick(['activeScene', 'ui', 'editor', 'activeTile']);
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SystemViewer);

function sortTiles (arr) {
  const cmpX = R.ascend(R.path(['position', 'x']));
  const cmpY = R.ascend(R.path(['position', 'y']));
  return R.sortWith([cmpX, cmpY], arr);
}
