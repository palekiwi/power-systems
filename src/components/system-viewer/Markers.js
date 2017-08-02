import React from 'react';
import PropTypes from 'prop-types';

Markers.propTypes = {
  grid: PropTypes.object.isRequired,
  structureTiles: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired
};

function Markers ({grid, structureTiles, handleClick}) {
  return (
    <div>
    </div>
  );
}


export default Markers;
