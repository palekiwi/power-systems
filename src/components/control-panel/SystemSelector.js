import React from 'react';
import PropTypes from 'prop-types';

SystemSelector.propTypes = {
  scenes: PropTypes.array.isRequired,
  activeScene: PropTypes.object,
  setActiveScene: PropTypes.func.isRequired,
  createNewScene: PropTypes.func.isRequired,
};

function SystemSelector (props) {
  return (
    <div>
      <h3>Power Systems</h3>
      <div>
        {props.scenes.map(s => (
          <div key={s.name}>
          <button onClick={() => props.setActiveScene(s)}>
            {s.name}
          </button>
          </div>)
        )}
        <button onClick={props.createNewScene}>New</button>
      </div>
    </div>
  );
}

export default SystemSelector;
