import React from 'react';
import PropTypes from 'prop-types';

ControlPanel.propTypes = {
  cases: PropTypes.array.isRequired,
  activeIdx: PropTypes.number.isRequired,
  setActiveIdx: PropTypes.func.isRequired
};

function ControlPanel ({cases, setActiveIdx}) {
  return (
    <div className='ControlPanel' >
      <div className='content'>
        <h3>Power Systems</h3>
        <div>
          {cases.map((c, i) =>
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
