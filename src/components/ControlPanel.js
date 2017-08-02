import React from 'react';
import PropTypes from 'prop-types';

ControlPanel.propTypes = {
  cases: PropTypes.array.isRequired,
  activeIdx: PropTypes.number.isRequired
};

function ControlPanel ({cases}) {
  return (
    <div className="ControlPanel">
      <h3>Power Systems</h3>
      <div>
        {cases.map((c, i) =>
          <div key={c.name}>
            <button>
              {c.name}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


export default ControlPanel;
