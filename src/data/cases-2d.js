import case2d from '../lib/case-2d.js';
import vector from '../lib/vector.js';
import tile, { flatmapToTilesArray } from '../lib/tile.js';
import { fushanMicrogrid, qimeiMicrogrid } from './power-systems.js';
import { grass, water } from './terrain-textures.js';
import { factory2, house } from './structure-textures.js';

export const fushan = case2d({
  name: 'Fushan Microgrid',
  gridSize: [3, 3],
  terrainTiles: flatmapToTilesArray([
    [grass, grass, grass],
    [grass, grass, grass],
    [grass, grass, grass]
  ]),
  system: fushanMicrogrid,
  structureTiles: [
    tile({data: {name: 'Diesel Generator'}, position: vector(0, 0), texture: factory2}),
    tile({data: {name: 'House'}, position: vector(1, 1), texture: house})
  ]
});

export const qimei = case2d({
  name: 'Qimei Microgrid',
  gridSize: [4, 4],
  terrainTiles: flatmapToTilesArray([
    [grass, grass, grass, grass],
    [grass, grass, grass, grass],
    [grass, grass, grass, grass],
    [water, water, water, water]
  ]),
  system: qimeiMicrogrid,
  structureTiles: [
    tile({data: {name: 'Diesel Generator'}, position: vector(0, 0), texture: factory2}),
    tile({data: {name: 'House1'}, position: vector(1, 1), texture: house}),
    tile({data: {name: 'House2'}, position: vector(3, 2), texture: house})
  ]
});
