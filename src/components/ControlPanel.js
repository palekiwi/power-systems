import React from 'react';
import PropTypes from 'prop-types';

ControlPanel.propTypes = {
  scenes: PropTypes.array.isRequired,
  activeIdx: PropTypes.number.isRequired,
  setActiveIdx: PropTypes.func.isRequired
};

function ControlPanel ({scenes, setActiveIdx}) {
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
    </div>
    </div>
  );
}


export default ControlPanel;
