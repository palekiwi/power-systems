import React from 'react';
import PropTypes from 'prop-types';
import ts from '../../data/editor/terrainTiles.js';
import ss from '../../data/editor/structureTiles.js';
import assoc from 'ramda/src/assoc';
import './TileEditor.scss';

class TileEditor extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      type: 'structureTiles',
    };

    this.closeModal = this.closeModal.bind(this);
    this.setActiveType = this.setActiveType.bind(this);
    this.saveTile = this.saveTile.bind(this);
    this.deleteTile = this.deleteTile.bind(this);
  }

  saveTile (tile) {
    const position = this.props.activeTile;
    this.props.saveTile({
      type: this.state.type,
      tile: assoc('position', position, tile)
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
        <div className="TileEditor__Content container">
          <div>
            <button onClick={() => this.setActiveType('terrainTiles')}>Terrain</button>
            <button onClick={() => this.setActiveType('structureTiles')}>Structures</button>
          </div>

          { this.state.type == 'terrainTiles' &&
            <div>
              <div>
                {ts.map((t,i) =>
                  <span key={i}
                    onClick={() => this.saveTile(t)}
                  >
                    <span>{t.name}</span>
                    <img src={require('../../assets/' + t.texture.filename)}/>
                  </span>
                )}
              </div>
            </div>
          }

          { this.state.type == 'structureTiles' &&
            <div>
              <div className="columns is-multiline TileEditor__Textures">
                {ss.map((t,i) =>
                  <div className="column is-3" key={i}
                    onClick={() => this.saveTile(t)}
                  >
                    <img src={require('../../assets/' + t.texture.filename)}/>
                  </div>
                )}
              </div>
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
