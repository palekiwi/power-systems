import React from 'react';
import PropTypes from 'prop-types';
import tile from '../../lib/tile.js';
import * as tt from '../../data/terrain-textures.js';
import './TileEditor.scss';

class TileEditor extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      type: 'structureTile',
      texture: {},
      data: {}
    };
  }
  saveTile () {
    const {type, texture, data} = this.state;
    const position = this.props.activeTile;
    this.props.saveTile({
      type,
      tile: tile({texture, position, data})
    });
  }

  render () {
    return (
      <div className="TileEditor">
        <div className="TileEditor__Background"
          onClick={this.props.resetActiveTile}
        >
        </div>
        <div className="TileEditor__Content">
          <button onClick={() => this.saveTile()}>Save</button>
        </div>
      </div>
    );
  }
}

TileEditor.propTypes = {
  saveTile: PropTypes.func.isRequired,
  resetActiveTile: PropTypes.func.isRequired,
  terrainTile: PropTypes.object,
  structureTile: PropTypes.object,
  activeTile: PropTypes.object.isRequired
};

export default TileEditor;
