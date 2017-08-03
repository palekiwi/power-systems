import React from 'react';
import PropTypes from 'prop-types';
import { domIsoCircle } from '../../helpers/dom-helpers.js';
import './Markers.scss';

Markers.propTypes = {
  grid: PropTypes.object.isRequired,
  structureTiles: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired
};

function Markers ({grid, structureTiles, handleClick}) {
  return (
    <div className='Markers'>
      {structureTiles.map((t, i)=> {
        let style = domIsoCircle(grid, t);
        return (
          <div key={i} className='Marker'
            onClick={(e) => handleClick(e, t)}
            style={style}/>
        );
      }
      )}
    </div>
  );
}


export default Markers;
