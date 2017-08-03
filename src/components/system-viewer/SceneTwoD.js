/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import isometricGrid from '../../lib/isometric-grid.js';
import DomTerrain from './DomTerrain.js';
import DomStructures from './DomStructures.js';
import Grid from './Grid.js';
import Network from './Network.js';
import Markers from './Markers.js';
import './SceneTwoD.scss';

class SceneTwoD extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      grid: isometricGrid({})
    };
  }
  componentDidMount () {
    let width = this.scene.offsetWidth;
    let height = this.scene.offsetHeight;
    let grid = isometricGrid({width, height, gridSize: this.props.gridSize});
    this.setState({width, height, grid});

  }

  render () {
    return (
      <div className="SceneTwoD" ref={c => this.scene = c}>
        <DomTerrain grid={this.state.grid} terrainTiles={this.props.terrainTiles}/>
        <Grid grid={this.state.grid} />
        <DomStructures grid={this.state.grid} structureTiles={this.props.structureTiles}/>
        <Network grid={this.state.grid} structureTiles={this.props.structureTiles}/>
        <Markers grid={this.state.grid}
          handleClick={() => null}
          structureTiles={this.props.structureTiles}/>
      </div>
    );
  }
}

SceneTwoD.propTypes = {
  gridSize: PropTypes.array.isRequired,
  system: PropTypes.object.isRequired,
  terrainTiles: PropTypes.array.isRequired,
  structureTiles: PropTypes.array.isRequired,
};

export default SceneTwoD;
