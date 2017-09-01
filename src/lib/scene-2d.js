//import validateScene2d from './validate-scene2d.js';
import { sortTiles } from './tile';

// scene2d :: Object -> Object
const scene2d = (options) => {
  //validateScene2d(options);
  let {name, gridSize, terrainTiles, structureTiles} = options;

  return Object.assign({}, {
    id: id(),
    name,
    gridSize,
    terrainTiles: sortTiles(terrainTiles),
    structureTiles: sortTiles(structureTiles)
  });
};

export default scene2d;

function id () {
  return '_' + Math.random().toString(36).substr(2, 9);
}
