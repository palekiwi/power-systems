/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Scene from '../components/system-viewer/SceneEditor.js';
import SystemChart from '../components/charts/SystemChart.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from '../actions/uiActions.js';
import * as activeStructureActions from '../actions/activeStructureActions.js';
import * as svModalActions from '../actions/svModalActions.js';
import * as activeTileActions from '../actions/activeTileActions.js';
import * as activeSceneActions from '../actions/activeSceneActions.js';
import mergeAll from 'ramda/src/mergeAll';
import pick from 'ramda/src/pick';
import isNil from 'ramda/src/isNil';
import './SystemViewer.scss';

const actions = mergeAll([
  uiActions,
  svModalActions,
  activeStructureActions,
  activeTileActions,
  activeSceneActions
]);

SystemViewer.propTypes = {
  activeScene: PropTypes.object,
  ui: PropTypes.object,
  setViewerMode: PropTypes.func.isRequired,
  editor: PropTypes.bool,
  setActiveStructure: PropTypes.func.isRequired,
  setActiveTile: PropTypes.func.isRequired,
  resetActiveTile: PropTypes.func.isRequired,
  deleteTile: PropTypes.func.isRequired,
  activeTile: PropTypes.object,
  saveTile: PropTypes.func.isRequired,
  openSVModal: PropTypes.func.isRequired,
  closeSVModal: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired
};

function SystemViewer (props) {

  return (
    <div className="SystemViewer">
      <div>
        <button onClick={() => props.setViewerMode('graphic')}>Graphic</button>
        <button onClick={() => props.setViewerMode('chart')}>Chart</button>
      </div>

      {isNil(props.activeScene) ?
        <div className="selection-prompt">
          Please select a system...
        </div>
      : props.ui.viewerMode == 'graphic' ?
        <Scene
          {...props.activeScene}
          openSVModal={props.openSVModal}
          closeSVModal={props.closeSVModal}
          setActiveStructure={props.setActiveStructure}
          setActiveTile={props.setActiveTile}
          resetActiveTile={props.resetActiveTile}
          deleteTile={props.deleteTile}
          activeTile={props.activeTile}
          saveTile={props.saveTile}
          resizePane={props.ui.resizePane}
          editor={props.editor}
          time={props.time}
        />
      :
        <SystemChart
          structureTiles={props.activeScene.structureTiles}
          time={props.time}
        />
      }
    </div>
  );
}

const mapStateToProps = pick(['activeScene', 'ui', 'editor', 'activeTile', 'time']);
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SystemViewer);
