import scene2d from '../../lib/scene-2d.js';
import vector from '../../lib/vector.js';
import { flatmapToTilesArray } from '../../lib/tile.js';
import { battery, diesel, solar, powerPole, houseThatched, farm } from '../../helpers/tile-creators.js';
import { grass, dirt } from '../terrain-textures.js';
import evolve from 'ramda/src/evolve';
import data from '../power/index.js';

const village = scene2d({
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
        type: 'base'
      }
    }),
    solar({
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

export default village;
