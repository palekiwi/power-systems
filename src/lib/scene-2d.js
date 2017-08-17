import validateScene2d from './validate-scene2d.js';

// scene2d :: Object -> Object
const scene2d = (options) => {
  validateScene2d(options);
  let {name, gridSize, terrainTiles, structureTiles} = options;

  return Object.assign({}, {
    name,
    gridSize,
    terrainTiles,
    structureTiles});
};

export default scene2d;
