import React from 'react';
import PropTypes from 'prop-types';

Network.propTypes = {
  grid: PropTypes.object.isRequired,
  structureTiles: PropTypes.array.isRequired
};

function Network ({grid, structureTiles}) {
  return (
    <div className="Network">
      <svg>
      </svg>
    </div>
  );
}


export default Network;
