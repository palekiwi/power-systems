/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { domIsoTile } from '../../helpers/dom-helpers.js';

class DomStructures extends React.Component {
  render () {
    let {grid, tile} = this.props;
    let style = domIsoTile(grid, tile);

    return (
      <div className="Tile" style={style}>
        <img src={require('../../assets/' + tile.texture.filename)}/>
      </div>
    );
  }
}

DomStructures.propTypes = {
  grid: PropTypes.object.isRequired,
  tile: PropTypes.object.isRequired
};

export default DomStructures;
