import case2d from '../lib/case-2d.js';
import vector from '../lib/vector.js';
import tile, { flatmapToTilesArray } from '../lib/tile.js';
import { fushanMicrogrid, qimeiMicrogrid } from './power-systems.js';
import { grass, water } from './terrain-textures.js';
import * as ST from './structure-textures.js';

export const fushan = case2d({
  name: 'Fushan Microgrid',
  gridSize: [4, 4],
  terrainTiles: flatmapToTilesArray([
    [grass, grass, grass],
    [grass, grass, grass],
    [grass, grass, grass]
  ]),
  system: fushanMicrogrid,
  structureTiles: [
    tile({data: {name: 'Diesel Generator', type: 'generator', active: false}, position: vector(0, 1), texture: ST.dieselGenerator}),
    tile({data: {name: 'Wind Generator', type: 'generator', active: false}, position: vector(2, 0), texture: ST.windGen}),
    tile({data: {name: 'Power Grid', type: 'distributor'}, position: vector(1, 1), texture: ST.powerPole}),
    tile({data: {name: 'Farm', type: null}, position: vector(2, 2), texture: ST.farm}),
    tile({data: {name: 'House', type: 'consumer'}, position: vector(1, 2), texture: ST.houseThatched})

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
    tile({data: {name: 'Diesel Generator', type: 'generator', active: false}, position: vector(0, 0), texture: ST.factory2}),
    tile({data: {name: 'Power Grid', type: 'distributor'}, position: vector(2, 1), texture: ST.network}),
    tile({data: {name: 'House1', type: 'consumer'}, position: vector(3, 2), texture: ST.house}),
    tile({data: {name: 'House2', type: 'consumer'}, position: vector(0, 2), texture: ST.house})
  ]
});
