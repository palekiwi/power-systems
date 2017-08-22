/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Scene from '../components/system-viewer/SceneTwoD.js';
import R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from '../actions/uiActions.js';
import * as activeStructureActions from '../actions/activeStructureActions.js';
import * as svModalActions from '../actions/svModalActions.js';
import './SystemViewer.scss';

const actions = R.mergeAll([uiActions, svModalActions, activeStructureActions]);

SystemViewer.propTypes = {
  activeScene: PropTypes.object,
  ui: PropTypes.object,
  setActiveStructure: PropTypes.func.isRequired,
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
        <Scene {...props.activeScene}
          openSVModal={props.openSVModal}
          closeSVModal={props.closeSVModal}
          setActiveStructure={props.setActiveStructure}
          resizePane={props.ui.resizePane} />
      }
    </div>
  );
}

const mapStateToProps = R.pick(['activeScene', 'ui']);
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SystemViewer);
