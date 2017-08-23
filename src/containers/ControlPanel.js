/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as activeSceneActions from '../actions/activeSceneActions.js';
import * as editorActions from '../actions/editorActions.js';
import SystemSelector from '../components/control-panel/SystemSelector.js';
import SystemControls from '../components/control-panel/SystemControls.js';

const actions = R.mergeAll([activeSceneActions, editorActions]);

ControlPanel.propTypes = {
  scenes: PropTypes.array.isRequired,
  activeScene: PropTypes.object,
  setActiveScene: PropTypes.func.isRequired,
  sceneTogglePower: PropTypes.func.isRequired,
  createNewScene: PropTypes.func.isRequired,
  toggleStructureActive: PropTypes.func.isRequired,
  editScene: PropTypes.func.isRequired
};

function ControlPanel (props) {
  return (
    <div className='ControlPanel' >
      <div className='content'>

        <SystemSelector
          createNewScene={props.createNewScene}
          activeScene={props.activeScene}
          setActiveScene={props.setActiveScene}
          scenes={props.scenes}
        />

        {!R.isNil(props.activeScene) &&
          <SystemControls
            activeScene={props.activeScene}
            sceneTogglePower={props.sceneTogglePower}
            toggleStructureActive={props.toggleStructureActive}
            editScene={props.editScene}
          />
        }
      </div>
    </div>
  );
}

const mapStateToProps = R.pick(['scenes', 'activeScene']);
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
