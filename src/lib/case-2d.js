import validateCase2d from './validate-case2d.js';

// case2d :: Object -> Object
const case2d = (options) => {
  validateCase2d(options);
  let {name, gridSize, terrainTiles, system, structureTiles} = options;

  return Object.assign({}, {
    name,
    gridSize,
    terrainTiles,
    system,
    structureTiles});
};

export default case2d;
