import React from 'react';
import PropTypes from 'prop-types';
import * as shapes from '../../lib/shapes.js';
import { Stage, Graphics } from 'react-pixi';
import { drawShape } from '../../helpers/pixi-helpers.js';
import TerrainTiles from './TerrainTiles.js';
import StructureTile from './StructureTile.js';

class MainCanvass extends React.Component {
  componentDidMount () {
    let graphics = this.graphics;
    shapes.grid(this.props.grid)
     .forEach(t => drawShape(graphics, t));
  }

  render () {
    let {width, height, grid, terrainTiles, structureTiles} = this.props;

    return (
      <Stage width={width} height={height} transparent={true}>

        <TerrainTiles grid={grid} terrainTiles={terrainTiles}/>

        <Graphics ref={c => this.graphics = c}/>
          {this.props.structureTiles.map(tile =>
            <StructureTile key={tile.data.name} tile={tile} grid={grid}/>)}

      </Stage>
    );
  }
}

MainCanvass.propTypes = {
  grid: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  terrainTiles: PropTypes.array.isRequired,
  structureTiles: PropTypes.array.isRequired,
};

export default MainCanvass;
