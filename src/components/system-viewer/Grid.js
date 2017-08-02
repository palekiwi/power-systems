import React from 'react';
import PropTypes from 'prop-types';

Grid.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  grid: PropTypes.string.isRequired
};

function Grid ({width, height, grid}) {
  return (
    <svg width={width} height={height}>
    </svg>
  );
}


export default Grid;
