import React from 'react';
import PropTypes from 'prop-types';

Network.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  grid: PropTypes.object.isRequired
};

function Network ({width, height, grid}) {
  return (
    <svg width={width} height={height}>
    </svg>
  );
}


export default Network;
