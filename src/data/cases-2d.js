import case2d from '../lib/case-2d.js';
import vector from '../lib/vector.js';
import tile, { flatmapToTilesArray } from '../lib/tile.js';
import { fushanMicrogrid, qimeiMicrogrid } from './power-systems.js';
import { grass, water } from './terrain-textures.js';
import { network, factory2, house } from './structure-textures.js';

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
    tile({data: {name: 'Diesel Generator', type: 'generator', active: true}, position: vector(0, 0), texture: factory2}),
    tile({data: {name: 'Power Grid', type: 'distributor'}, position: vector(0, 1), texture: network}),
    tile({data: {name: 'House', type: 'consumer'}, position: vector(2, 2), texture: house})
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
    tile({data: {name: 'Diesel Generator', type: 'generator', active: true}, position: vector(0, 0), texture: factory2}),
    tile({data: {name: 'Power Grid', type: 'distributor'}, position: vector(2, 1), texture: network}),
    tile({data: {name: 'House1', type: 'consumer'}, position: vector(3, 2), texture: house}),
    tile({data: {name: 'House2', type: 'consumer'}, position: vector(0, 2), texture: house})
  ]
});
