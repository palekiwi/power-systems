import scene2d from '../../lib/scene-2d.js';
import vector from '../../lib/vector.js';
import { flatmapToTilesArray } from '../../lib/tile.js';
import { battery, diesel, solar, powerPole, houseThatched, houseElevated } from '../../helpers/tile-creators.js';
import { grass, water } from '../terrain-textures.js';

const island = scene2d({
  name: 'Island Microgrid',
  gridSize: [5, 5],
  terrainTiles: flatmapToTilesArray([
    [water, water, water, water, water],
    [water, grass, grass, grass, water],
    [water, grass, grass, grass, water],
    [water, grass, grass, grass, water],
    [water, water, water, water, water],
  ]),
  structureTiles: [
    diesel({
      position: vector(1, 1),
      data: {
        capacity: 100,
        type: 'base'
      }
    }),
    battery({
      position: vector(2, 1),
      data:{
        capacity: 100,
      }
    }),
    solar({
      position: vector(3, 1),
      data:{
        capacity: 100,
      }
    }),
    powerPole({
      position: vector(2, 2),
    }),
    houseElevated({
      position: vector(1, 3),
    }),
    houseThatched({
      position: vector(3, 3),
      data: {
        capacity: 100
      }
    })
  ]
});

export default island;
