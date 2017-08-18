/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Scene from './SceneTwoD.js';
import R from 'ramda';
import './SystemViewer.scss';

SystemViewer.propTypes = {
  scenes: PropTypes.array.isRequired,
  activeScene: PropTypes.object,
  openSystemViewerModal: PropTypes.func.isRequired,
  activateScene: PropTypes.func.isRequired,
  deactivateScene: PropTypes.func.isRequired,
  resize: PropTypes.bool
};

function SystemViewer ({scenes, activeScene, openSystemViewerModal, activateScene, deactivateScene, resize}) {

  return (
    <div className="SystemViewer">
      {R.isNil(activeScene) ?
        <div className="selection-prompt">
          Please select a system...
        </div>
        :
        <Scene {...activeScene}
          resize={resize}
          activateScene={activateScene}
          deactivateScene={deactivateScene}
          openSystemViewerModal={openSystemViewerModal}
        />
      }
    </div>
  );
}

export default SystemViewer;
