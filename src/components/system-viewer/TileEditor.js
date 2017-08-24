import React from 'react';
import PropTypes from 'prop-types';
import tile from '../../lib/tile.js';
import * as tt from '../../data/terrain-textures.js';
import * as st from '../../data/structure-textures.js';
import values from 'ramda/src/values';
import isEmpty from 'ramda/src/isEmpty';
import './TileEditor.scss';

class TileEditor extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      type: 'structureTiles',
      texture: {},
      data: {}
    };

    this.saveTerrainTile = this.saveTerrainTile.bind(this);
    this.saveStructureTile = this.saveStructureTile.bind(this);
    this.setStructureTexture = this.setStructureTexture.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setActiveType = this.setActiveType.bind(this);
    this.deleteTile = this.deleteTile.bind(this);
  }

  saveStructureTile () {
    const {texture, data} = this.state;
    const position = this.props.activeTile;
    this.props.saveTile({
      type: 'structureTiles',
      tile: tile({texture, position, data})
    });
  }

  setStructureTexture (texture) {
    return this.setState({texture});
  }

  saveTerrainTile (texture) {
    const position = this.props.activeTile;
    return this.props.saveTile({
      type: 'terrainTiles',
      tile: tile({texture, position})
    });
  }

  closeModal () {
    return this.props.resetActiveTile();
  }

  deleteTile () {
    return this.props.deleteTile({
      type: this.state.type,
      position: this.props.activeTile,
    });
  }

  setActiveType (type) {
    this.setState({type});
  }

  render () {
    return (
      <div className="TileEditor">
        <div className="TileEditor__Background"
          onClick={this.props.resetActiveTile}
        >
        </div>
        <div className="TileEditor__Content">
          <div>
            <button onClick={() => this.setActiveType('terrainTiles')}>Terrain</button>
            <button onClick={() => this.setActiveType('structureTiles')}>Structures</button>
          </div>

          { this.state.type == 'terrainTiles' &&
            <div>
              <h3>Terrain</h3>
              <div>
                {values(tt).map((t,i) =>
                  <span key={i}
                    onClick={() => this.saveTerrainTile(t)}
                  >
                    <img src={require('../../assets/' + t.filename)}/>
                  </span>
                )}
              </div>
            </div>
          }

          { this.state.type == 'structureTiles' &&
            <div>
              <h3>Structures</h3>
              { isEmpty(this.state.texture) ?
                <div>
                  {values(st).map((t,i) =>
                    <span key={i}
                      onClick={() => this.setStructureTexture(t)}
                    >
                      <img src={require('../../assets/' + t.filename)}/>
                    </span>
                  )}
                </div>
                :
                <div>
                  settings
                </div>
              }
            </div>
          }

          <div>
            <button onClick={this.deleteTile}>Clear</button>
            <button onClick={this.closeModal}>Cancel</button>
          </div>

        </div>
      </div>
    );
  }
}

TileEditor.propTypes = {
  saveTile: PropTypes.func.isRequired,
  resetActiveTile: PropTypes.func.isRequired,
  deleteTile: PropTypes.func.isRequired,
  terrainTile: PropTypes.object,
  structureTile: PropTypes.object,
  activeTile: PropTypes.object.isRequired
};

export default TileEditor;
