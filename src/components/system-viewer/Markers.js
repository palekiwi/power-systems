import React from 'react';
import PropTypes from 'prop-types';
import { domIsoCircle } from '../../helpers/dom-helpers.js';
import './Markers.scss';

const handleOpenSVModal = (props) => (e, tile) => {
  const {left, top} = e.target.getBoundingClientRect();
  props.setActiveStructure(tile);
  props.openSVModal([left, top]);
};

Markers.propTypes = {
  grid: PropTypes.object.isRequired,
  structureTiles: PropTypes.array.isRequired,
  openSVModal: PropTypes.func.isRequired,
  closeSVModal: PropTypes.func.isRequired,
  setActiveStructure: PropTypes.func.isRequired,
};

function Markers (props) {
  return (
    <div className='Markers'>
      {props.structureTiles.map((t, i)=> {
        let style = domIsoCircle(props.grid, t);
        return (
          <div key={i} className='Marker'
            onClick={e => handleOpenSVModal(props)(e, t)}
            style={style}/>
        );
      }
      )}
    </div>
  );
}


export default Markers;
