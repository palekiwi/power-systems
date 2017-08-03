/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import DomStructureTile from './DomStructureTile.js';
import './DomStructures.scss';

class DomStructures extends React.Component {
  render () {
    return (
      <div className="DomStructures">
        {this.props.structureTiles.map((t, i)=>
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
