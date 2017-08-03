/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { gridPolygonPoints } from '../../helpers/svg-helpers.js';
import './Grid.scss';

Grid.propTypes = {
  grid: PropTypes.object.isRequired
};

function Grid ({grid}) {
  return (
    <div className='Grid'>
      <svg>
        {gridPolygonPoints(grid).map((p,i) =>
          <polygon className="GridTile"
            key={i}
            points={p}/>
        )}
      </svg>
    </div>
  );
}

export default Grid;
