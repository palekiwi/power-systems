import scene2d from '../../lib/scene-2d.js';
import vector from '../../lib/vector.js';
import tile, { flatmapToTilesArray } from '../../lib/tile.js';
import { grass, water } from '../terrain-textures.js';
import * as ST from '../structure-textures.js';

export default scene2d({
  name: 'Coast Microgrid',
  gridSize: [4, 4],
  terrainTiles: flatmapToTilesArray([
    [grass, grass, grass, grass],
    [grass, grass, grass, grass],
    [grass, grass, grass, grass],
    [water, water, water, water]
  ]),
  structureTiles: [
    tile({
      position: vector(0, 0),
      texture: ST.dieselGenerator,
      data: {
        name: 'Diesel Generator',
        class: 'generator',
        capacity: 100,
        max: 200,
        active: false
      }
    }),
    tile({
      position: vector(2, 0),
      texture: ST.windGenAnim,
      data:{
        name: 'Wind Generator',
        class: 'generator',
        capacity: 100,
        max: 200,
        active: false
      }
    }),
    tile({
      position: vector(3, 0),
      texture: ST.windGenAnim,
      data:{
        name: 'Wind Generator',
        class: 'generator',
        capacity: 100,
        max: 200,
        active: false
      }
    }),
    tile({
      position: vector(1, 1),
      texture: ST.powerPole,
      data: {
        name: 'Power Grid',
        class: 'distributor',
        capacity: 100,
        max: 200,
        active: false
      }
    }),
    tile({
      position: vector(0, 2),
      texture: ST.farm,
      data: {
        name: 'Farm',
        class: null,
        capacity: 100,
        max: 200,
        active: false
      }
    }),
    tile({
      data: {
        name: 'House',
        class: 'consumer',
        capacity: 100,
        max: 200
      },
      position: vector(1, 2),
      texture: ST.houseThatched
    })
  ]
});
