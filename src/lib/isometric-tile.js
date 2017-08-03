module.exports = function isometricTile (grid, tile) {
  let tileCoords = grid.tileCoords(tile.position);

  const x = () => tileCoords.x;
  const y = () => tileCoords.y - tile.texture.size[2] * grid.tile.height;
  const width = () => grid.tile.width * (1 + tile.texture.size[0]) / 2;
  const height = () => grid.tile.height * (1 + (tile.texture.size[2] + tile.texture.size[0]) / 2);
  const midX = () => x() + width() * 0.5;
  const midY = () => y() + height() * 0.75;


  const proto = {
    x, y, width, height, midX, midY
  };

  return Object.create(proto);
};
