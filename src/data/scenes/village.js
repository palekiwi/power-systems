import scene2d from '../../lib/scene-2d.js';
import vector from '../../lib/vector.js';
import { flatmapToTilesArray } from '../../lib/tile.js';
import { diesel, wind, powerPole, houseThatched, farm } from '../../helpers/tile-creators.js';
import { grass, dirt } from '../terrain-textures.js';

export default scene2d({
  name: 'Village Microgrid',
  gridSize: [3, 3],
  terrainTiles: flatmapToTilesArray([
    [grass, grass, grass],
    [grass, grass, grass],
    [grass, dirt, grass]
  ]),
  structureTiles: [
    diesel({
      position: vector(0, 0),
      data: {
        capacity: 100,
      }
    }),
    wind({
      position: vector(2, 0),
      data:{
        capacity: 100,
      }
    }),
    powerPole({
      position: vector(1, 1),
    }),
    farm({
      position: vector(0, 2),
    }),
    houseThatched({
      position: vector(1, 2),
      data: {
        capacity: 100
      }
    })
  ]
});
