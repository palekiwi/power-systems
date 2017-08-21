/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Scene from '../components/system-viewer/SceneTwoD.js';
import R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/activeSceneActions.js';
import './SystemViewer.scss';

SystemViewer.propTypes = {
  activeScene: PropTypes.object
};

function SystemViewer ({activeScene}) {

  return (
    <div className="SystemViewer">
      {R.isNil(activeScene) ?
        <div className="selection-prompt">
          Please select a system...
        </div>
        :
        <Scene {...activeScene} />
      }
    </div>
  );
}

const mapStateToProps = R.pick(['activeScene']);
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SystemViewer);
