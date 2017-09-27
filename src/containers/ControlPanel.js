/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as activeSceneActions from '../actions/activeSceneActions.js';
import * as editorActions from '../actions/editorActions.js';
import * as legendActions from '../actions/legendActions.js';
import * as timeActions from '../actions/timeActions.js';
import SystemSelector from '../components/control-panel/SystemSelector.js';
import Clock from '../components/control-panel/Clock.js';
import './ControlPanel.scss';

const actions = R.mergeAll([activeSceneActions, editorActions, legendActions, timeActions]);

ControlPanel.propTypes = {
  ui: PropTypes.object,
  scenes: PropTypes.array.isRequired,
  activeScene: PropTypes.object,
  setActiveScene: PropTypes.func.isRequired,
  sceneTogglePower: PropTypes.func.isRequired,
  createNewScene: PropTypes.func.isRequired,
  toggleStructureActive: PropTypes.func.isRequired,
  setSceneName: PropTypes.func.isRequired,
  setGridSize: PropTypes.func.isRequired,
  saveNewScene: PropTypes.func.isRequired,
  updateScene: PropTypes.func.isRequired,
  closeEditor: PropTypes.func.isRequired,
  setStructureCapacity: PropTypes.func.isRequired,
  setStructureRamp: PropTypes.func.isRequired,
  setStructureBase: PropTypes.func.isRequired,
  setStructureType: PropTypes.func.isRequired,
  setBatteryC: PropTypes.func.isRequired,
  setBatteryBuffer: PropTypes.func.isRequired,
  setBatteryStorage: PropTypes.func.isRequired,
  editScene: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  legend: PropTypes.object,
  toggleLegendField: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  setTime: PropTypes.func.isRequired,
};

function ControlPanel (props) {
  return (
    <div className='ControlPanel' style={{width: '100%'}}>

      <p className="box">
        <img src={require('../assets/ctn.bmp')}/>
      </p>

      <div className="ControlPanel__Body">
        <Clock
          time={props.time}
          setTime={props.setTime}
        />

        <SystemSelector
          createNewScene={props.createNewScene}
          saveNewScene={props.saveNewScene}
          updateScene={props.updateScene}
          closeEditor={props.closeEditor}
          editScene={props.editScene}
          activeScene={props.activeScene}
          setActiveScene={props.setActiveScene}
          scenes={props.scenes}
          editor={props.editor}
        />
      </div>
    </div>
  );
}

const mapStateToProps = R.pick(['scenes', 'activeScene', 'editor', 'ui', 'legend', 'time']);
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
