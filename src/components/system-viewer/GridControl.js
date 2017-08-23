/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { zipGridPtsPolygonPts } from '../../helpers/svg-helpers.js';
import './GridControl.scss';

GridControl.propTypes = {
  grid: PropTypes.object.isRequired,
  setActiveTile: PropTypes.func.isRequired
};

function GridControl (props) {
  return (
    <div className='GridControl'>
      <svg>
        {zipGridPtsPolygonPts(props.grid).map(([gp, pp]) =>
          <polygon className="GridControlTile"
            key={gp}
            points={pp}
            onClick={() => props.setActiveTile(gp)}
          />
        )}
      </svg>
    </div>
  );
}

export default GridControl;
