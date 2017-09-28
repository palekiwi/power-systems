import scene2d from '../../lib/scene-2d.js';
import vector from '../../lib/vector.js';
import { flatmapToTilesArray } from '../../lib/tile.js';
import { battery, gas, solar, powerPole, warehouse, biomass, boat, farm } from '../../helpers/tile-creators.js';
import { grass, water } from '../terrain-textures.js';

const island = scene2d({
  name: 'Coast Microgrid',
  gridSize: [4, 4],
  terrainTiles: flatmapToTilesArray([
    [grass, grass, grass, water],
    [grass, grass, grass, water],
    [grass, grass, grass, water],
    [water, water, water, water],
  ]),
  structureTiles: [
    gas({
      position: vector(2, 0),
      data: {
        capacity: 100,
        type: 'base'
      }
    }),
    battery({
      position: vector(0, 1),
      data:{
        capacity: 100,
      }
    }),
    solar({
      position: vector(2, 1),
      data:{
        capacity: 100,
      }
    }),
    powerPole({
      position: vector(1, 1),
    }),
    farm({
      position: vector(0, 0),
    }),
    warehouse({
      position: vector(1, 2),
      data: {
        capacity: 100
      }
    }),
    biomass({
      position: vector(1, 0)
    }),
    boat({
      position: vector(2, 3)
    })
  ]
});

export default island;
