/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Scene from './SceneTwoD.js';
import './SystemViewer.scss';

SystemViewer.propTypes = {
  scenes: PropTypes.array.isRequired,
  activeIdx: PropTypes.number,
  openSystemViewerModal: PropTypes.func.isRequired,
  activateScene: PropTypes.func.isRequired,
  deactivateScene: PropTypes.func.isRequired
};

function SystemViewer ({scenes, activeIdx, openSystemViewerModal, activateScene, deactivateScene}) {
  let content = scenes.filter((_, i) => i == activeIdx).map(scene =>
    <Scene key={scene.name} {...scene}
      activateScene={activateScene}
      deactivateScene={deactivateScene}
      openSystemViewerModal={openSystemViewerModal}/>
  );

  return (
    <div className="SystemViewer">
      {content.length > 0 ? content :
        <div className="selection-prompt">
          Please select a system...
        </div>}
    </div>
  );
}

export default SystemViewer;
