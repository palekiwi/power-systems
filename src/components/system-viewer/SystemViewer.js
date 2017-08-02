/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Scene from './SceneTwoD.js';
import './SystemViewer.scss';

SystemViewer.propTypes = {
  scenes: PropTypes.array.isRequired,
  activeIdx: PropTypes.number
};

function SystemViewer ({scenes, activeIdx}) {
  let content = scenes.filter((_, i) => i == activeIdx).map(scene =>
    <Scene key={scene.name} {...scene}/>
  );

  return (
    <div className="SystemViewer">
      {content.length > 0 ? content : <div className="selection-prompt">Please Select a system.</div>}
    </div>
  );
}

export default SystemViewer;
