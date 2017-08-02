/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import * as shapes from '../../lib/shapes.js';
import isometricGrid from '../../lib/isometric-grid.js';
import { Stage, Graphics } from 'react-pixi';
import { drawShape } from '../../helpers/pixi-helpers.js';
import TerrainTiles from './TerrainTiles.js';
import StructureTile from './StructureTile.js';
import './SystemViewer.scss';

class SystemViewer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      grid: isometricGrid({})
    };
  }
  componentDidMount () {
    let width = this.graphic.offsetWidth;
    let height = this.graphic.offsetHeight;
    let grid = isometricGrid({width, height, gridSize: this.props.gridSize});
    this.setState({width, height, grid});

    let graphics = this.graphics;
    shapes.grid(grid)
     .forEach(t => drawShape(graphics, t));
  }

  render () {
    let {width, height, grid} = this.state;

    return (
      <div className="graphic" ref={c => this.graphic = c}>
        <Stage width={width} height={height} transparent={true}>
          <TerrainTiles grid={this.state.grid} terrainTiles={this.props.terrainTiles}/>
          <Graphics ref={c => this.graphics = c}/>
          {this.props.structureTiles.map(tile =>
           <StructureTile key={tile.data.name} tile={tile} grid={grid}/>)}
        </Stage>
      </div>
    );
  }
}

SystemViewer.propTypes = {
  gridSize: PropTypes.array.isRequired,
  system: PropTypes.object.isRequired,
  terrainTiles: PropTypes.array.isRequired,
  structureTiles: PropTypes.array.isRequired,
};

export default SystemViewer;
