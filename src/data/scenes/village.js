import case2d from '../../lib/case-2d.js';
import vector from '../../lib/vector.js';
import tile, { flatmapToTilesArray } from '../../lib/tile.js';
import { grass, water, dirt } from '../terrain-textures.js';
import * as ST from '../structure-textures.js';

export const village = case2d({
  name: 'Village Microgrid',
  gridSize: [3, 3],
  terrainTiles: flatmapToTilesArray([
    [grass, grass, grass],
    [grass, grass, grass],
    [grass, dirt, grass]
  ]),
  structureTiles: [
    tile({
      position: vector(0, 0),
      texture: ST.dieselGenerator,
      data: {
        name: 'Diesel Generator',
        type: 'generator',
        active: false
      }
    }),
    tile({
      position: vector(2, 0),
      texture: ST.windGenAnim,
      data:{
        name: 'Wind Generator',
        type: 'generator',
        active: false
      }
    }),
    tile({
      position: vector(1, 1),
      texture: ST.powerPole,
      data: {
        name: 'Power Grid',
        type: 'distributor',
        active: false
      }
    }),
    tile({
      position: vector(0, 2),
      texture: ST.farm,
      data: {
        name: 'Farm',
        type: null,
        active: false
      }
    }),
    tile({
      data: {
        name: 'House',
        type: 'consumer'
      },
      position: vector(1, 2),
      texture: ST.houseThatched
    })
  ]
});
