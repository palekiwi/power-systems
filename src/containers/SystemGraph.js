/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import SystemChart from '../components/charts/SystemChart.js';
import LineChart from '../components/charts/LineChart.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from '../actions/uiActions.js';
import * as editorActions from '../actions/editorActions.js';
import * as activeStructureActions from '../actions/activeStructureActions.js';
import * as svModalActions from '../actions/svModalActions.js';
import * as activeTileActions from '../actions/activeTileActions.js';
import * as activeSceneActions from '../actions/activeSceneActions.js';
import mergeAll from 'ramda/src/mergeAll';
import pick from 'ramda/src/pick';
import isNil from 'ramda/src/isNil';

const actions = mergeAll([
  uiActions,
  editorActions,
  svModalActions,
  activeStructureActions,
  activeTileActions,
  activeSceneActions
]);

SystemGraph.propTypes = {
  activeScene: PropTypes.object,
  ui: PropTypes.object,
  setViewerMode: PropTypes.func.isRequired,
  editor: PropTypes.bool,
  editScene: PropTypes.func.isRequired,
  closeEditor: PropTypes.func.isRequired,
  saveNewScene: PropTypes.func.isRequired,
  updateScene: PropTypes.func.isRequired,
  setActiveStructure: PropTypes.func.isRequired,
  setActiveTile: PropTypes.func.isRequired,
  resetActiveTile: PropTypes.func.isRequired,
  deleteTile: PropTypes.func.isRequired,
  activeTile: PropTypes.object,
  saveTile: PropTypes.func.isRequired,
  openSVModal: PropTypes.func.isRequired,
  closeSVModal: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  powerData: PropTypes.object.isRequired,
  legend: PropTypes.object.isRequired,
};

function SystemGraph (props) {
  if (isNil(props.activeScene)) {
    return (
    <div className="selection-prompt">
      No system selected.
    </div>);
  } else if (isNil(props.activeScene.id)) {
    return (
      <div>Update the system to see the chart</div>
    );
  } else {
    let powerData = props.powerData[props.activeScene.id];
    return (
      <SystemChart
        resizePane={props.ui.resizePane}
        structureTiles={props.activeScene.structureTiles}
        powerData={props.powerData[props.activeScene.id]}
        min={powerData.minPower}
        max={powerData.maxPower}
        time={props.time}
        legend={props.legend}
        type="power"
      >
      </SystemChart>
    );
  }
}

const mapStateToProps = pick(['activeScene', 'ui', 'editor', 'activeTile', 'time', 'powerData', 'legend']);
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SystemGraph);
