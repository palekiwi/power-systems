/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import isometricGrid from '../../lib/isometric-grid.js';
import DomTerrain from './DomTerrain.js';
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
        <div className="Grid">
          <Grid {...this.state} />
        </div>
        <div className="Network">
          <Network {...this.state} />
        </div>
        <div className="Markers">
          <Markers grid={this.state.grid}
            handleClick={() => null}
            structureTiles={this.props.structureTiles}/>
        </div>
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
