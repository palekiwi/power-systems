import React from 'react';
import PropTypes from 'prop-types';
import { Sprite } from 'react-pixi';
import isometricTile from '../../lib/isometric-tile.js';

StructureTile.propTypes = {
  grid: PropTypes.object.isRequired,
  tile: PropTypes.object.isRequired
};

function StructureTile ({grid, tile}) {
  let it = isometricTile(grid, tile);
  return (
    <Sprite
      image={require('../../assets/' + tile.texture.filename)}
      x={it.x()}
      y={it.y()}
      width={it.width()}
      height={it.height()}
    />
  );
}


export default StructureTile;
