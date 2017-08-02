module.exports = function isometricTile (grid, tile) {
  let tileCoords = grid.tileCoords(tile.position);

  const proto = {
    x: () => tileCoords.x,
    y: () => tileCoords.y - tile.texture.size[2] * grid.tile.height,
    width: () => grid.tile.width * (1 + tile.texture.size[0]) / 2,
    height: () => grid.tile.height * (1 + (tile.texture.size[2] + tile.texture.size[0]) / 2)
  };

  return Object.create(proto);
};
