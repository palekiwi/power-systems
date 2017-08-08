import React from 'react';
import PropTypes from 'prop-types';

ControlPanel.propTypes = {
  scenes: PropTypes.array.isRequired,
  activeIdx: PropTypes.number,
  setActiveIdx: PropTypes.func.isRequired,
  activateScene: PropTypes.func.isRequired,
  deactivateScene: PropTypes.func.isRequired
};

function ControlPanel ({scenes, setActiveIdx, activateScene, deactivateScene}) {
  return (
    <div className='ControlPanel' >
      <div className='content'>
        <h3>Power Systems</h3>
        <div>
          {scenes.map((c, i) =>
            <div key={c.name}>
              <button className='button'
                onClick={() => setActiveIdx(i)}>
                {c.name}
              </button>
            </div>
          )}
        </div>

        <hr />

        <div>
          <button onClick={activateScene}>
            Power On
          </button>
          <button onClick={deactivateScene}>
            Power Off
          </button>
        </div>
      </div>
    </div>
  );
}


export default ControlPanel;
