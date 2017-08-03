/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { domIsoTile } from '../../helpers/dom-helpers.js';
import './DomStructures.scss';

class DomStructures extends React.Component {
  render () {
    return (
      <div className="DomStructures">
        {this.props.terrainTiles.map((t, i)=> {
          let style = domIsoTile(this.props.grid, t);
          return (
            <div className="Tile" style={style} key={i}>
              <img src={require('../../assets/' + t.texture.filename)}/>
            </div>
          );
        }
        )}
      </div>
    );
  }
}

DomStructures.propTypes = {
  grid: PropTypes.object.isRequired,
  terrainTiles: PropTypes.array.isRequired
};

export default DomStructures;
