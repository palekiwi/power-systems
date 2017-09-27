import React from 'react';
import PropTypes from 'prop-types';
import ts from '../../data/editor/terrainTiles.js';
import ss from '../../data/editor/structureTiles.js';
import merge from 'ramda/src/merge';
import randomId from '../../lib/random-id.js';
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
      tile: merge(tile, {id: randomId(), 'position': position})
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
        <div className="TileEditor__Content">

          <div className="TileEditor__Header">
            <div className="tabs is-centered">
              <ul>
                <li>
                  <a onClick={() => this.setActiveType('terrainTiles')}>Terrain</a>
                </li>
                <li>
                  <a onClick={() => this.setActiveType('structureTiles')}>Structures</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="TileEditor__Body">

            <div className="columns is-multiline TileEditor__Textures">
            { this.state.type == 'terrainTiles' &&
                ts.map((t,i) =>
                  <div className="column"
                    key={i}
                  >
                    <a className="box"
                      onClick={() => this.saveTile(t)}
                    >
                      <p className="TileEditor__Image">
                        <img className="TerrainImage" src={require('../../assets/' + t.texture.filename)}/>
                      </p>
                      <p className="title is-5 has-text-centered">
                        {t.name}
                      </p>
                    </a>

                  </div>
                )
              }
             </div>

            <div className="columns is-multiline TileEditor__Textures">
            { this.state.type == 'structureTiles' &&
                ss.map((t,i) =>
                  <div className="column is-3 is-half-tablet"
                    key={i}
                  >
                    <a className="box"
                      onClick={() => this.saveTile(t)}
                    >
                      <p className="TileEditor__Image">
                        <img className="StructureImage" src={require('../../assets/' + t.texture.filename)}/>
                      </p>
                      <p className="title is-5 has-text-centered">
                        {t.name}
                      </p>
                    </a>

                  </div>
                )
              }
             </div>

            </div>

            <div className="TileEditor__Footer">
              <div className="field is-grouped">
                <div className="control">
                  <button className="button" onClick={this.closeModal}>Cancel</button>
                </div>

                <div className="control">
                  <button className="button is-danger" onClick={this.deleteTile}>Clear</button>
                </div>
              </div>
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
