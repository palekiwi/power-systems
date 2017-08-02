import React from 'react';
import PropTypes from 'prop-types';

Grid.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  grid: PropTypes.object.isRequired
};

function Grid ({width, height, grid}) {
  return (
    <svg width={width} height={height}>
    </svg>
  );
}


export default Grid;
