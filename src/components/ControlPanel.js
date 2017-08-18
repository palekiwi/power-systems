import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

ControlPanel.propTypes = {
  scenes: PropTypes.array.isRequired,
  activeScene: PropTypes.object,
  setActiveScene: PropTypes.func.isRequired
};

function ControlPanel ({scenes, activeScene, setActiveScene}) {
  return (
    <div className='ControlPanel' >
      <div className='content'>
        <h3>Power Systems</h3>
        <div>
          {scenes.map(s => (
            <div key={s.name}>
              <button onClick={() => setActiveScene(s)}>
                {s.name}
              </button>
            </div>)
          )}
        </div>

        <hr />

        <div>
          <h4>Generators:</h4>
          <div>
            {!R.isNil(activeScene) && activeScene.structureTiles
              .filter(R.propEq('type', 'generator'))
              .map(s => (
                <div key={s.name}>
                  <span>{s.name}</span>
                  <input type="checkbox"/>
                </div>
              ))
            }
          </div>
        </div>

      </div>
    </div>
  );
}

export default ControlPanel;
