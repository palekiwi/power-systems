/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import DomStructureTile from './DomStructureTile.js';
import DomStructureAnimated from './DomStructureAnimated.js';
import './DomTiles.scss';

class DomStructures extends React.Component {
  render () {
    return (
      <div className="DomTiles DomStructures">
        {this.props.structureTiles.map((t, i)=>
          t.texture.frames > 1 ?
          <DomStructureAnimated key={i} grid={this.props.grid} tile={t}/> :
          <DomStructureTile key={i} grid={this.props.grid} tile={t}/>
        )}
      </div>
    );
  }
}

DomStructures.propTypes = {
  grid: PropTypes.object.isRequired,
  structureTiles: PropTypes.array.isRequired
};

export default DomStructures;
