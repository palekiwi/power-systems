import React from 'react';
import PropTypes from 'prop-types';

ControlPanel.propTypes = {
  scenes: PropTypes.object.isRequired,
  activeScene: PropTypes.object
};

function ControlPanel ({scenes, activeScene}) {
  return (
    <div className='ControlPanel' >
      <div className='content'>
        <h3>Power Systems</h3>
        <div>
        </div>

        <hr />

      </div>
    </div>
  );
}

export default ControlPanel;
