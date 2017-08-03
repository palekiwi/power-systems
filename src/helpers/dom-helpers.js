import isometricTile from '../lib/isometric-tile.js';

export function domIsoTile (grid, tile) {
  let t = isometricTile(grid, tile);

  return {
    left: t.x(),
    top: t.y(),
    width: t.width(),
    height: t.height()
  };
}
