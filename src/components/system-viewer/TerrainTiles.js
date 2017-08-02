import React from 'react';
import PropTypes from 'prop-types';
import { DisplayObjectContainer, Sprite } from 'react-pixi';

TerrainTiles.propTypes = {
  terrainTiles: PropTypes.array.isRequired,
  grid: PropTypes.object.isRequired
};

function TerrainTiles ({grid, terrainTiles}) {
  return (
    <DisplayObjectContainer>
      {terrainTiles.map(t =>
        <Sprite key={t.position + t.texture.filename}
          width={grid.tile.width}
          height={grid.tile.height * t.texture.height}
          x={grid.tileCoords(t.position).x}
          y={grid.tileCoords(t.position.plus(t.texture.offsetHeight)).y}
          image={require('../../assets/' + t.texture.filename)}/>
      )}
    </DisplayObjectContainer>
  );
}


export default TerrainTiles;
