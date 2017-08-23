/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { zipGridPtsPolygonPts } from '../../helpers/svg-helpers.js';
import './GridControl.scss';

GridControl.propTypes = {
  grid: PropTypes.object.isRequired
};

function GridControl ({grid}) {
  return (
    <div className='GridControl'>
      <svg>
        {zipGridPtsPolygonPts(grid).map(([gp, pp]) =>
          <polygon className="GridControlTile"
            key={gp}
            points={pp}/>
        )}
      </svg>
    </div>
  );
}

export default GridControl;
