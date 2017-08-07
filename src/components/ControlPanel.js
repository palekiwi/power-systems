import React from 'react';
import PropTypes from 'prop-types';

ControlPanel.propTypes = {
  scenes: PropTypes.array.isRequired,
  activeIdx: PropTypes.number,
  setActiveIdx: PropTypes.func.isRequired,
  toggleActivateScene: PropTypes.func.isRequired
};

function ControlPanel ({scenes, setActiveIdx, toggleActivateScene}) {
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
          <button onClick={toggleActivateScene}>
            activate system
          </button>
        </div>
      </div>
    </div>
  );
}


export default ControlPanel;
