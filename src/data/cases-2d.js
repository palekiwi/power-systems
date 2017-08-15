import case2d from '../lib/case-2d.js';
import vector from '../lib/vector.js';
import tile, { flatmapToTilesArray } from '../lib/tile.js';
import { villageMicrogrid
       , coastMicrogrid
       , bigIslandMicrogrid
       , smallIslandMicrogrid
       } from './power-systems.js';

import { grass, water, dirt } from './terrain-textures.js';
import * as ST from './structure-textures.js';

export const village = case2d({
  name: 'Village Microgrid',
  gridSize: [3, 3],
  terrainTiles: flatmapToTilesArray([
    [grass, grass, grass],
    [grass, grass, grass],
    [grass, dirt, grass]
  ]),
  system: villageMicrogrid,
  structureTiles: [
    tile({data: {name: 'Diesel Generator', type: 'generator', active: false}, position: vector(0, 0), texture: ST.dieselGenerator}),
    tile({data: {name: 'Wind Generator', type: 'generator', active: false}, position: vector(2, 0), texture: ST.windGenAnim}),
    tile({data: {name: 'Power Grid', type: 'distributor'}, position: vector(1, 1), texture: ST.powerPole}),
    tile({data: {name: 'Farm', type: null}, position: vector(0, 2), texture: ST.farm}),
    tile({data: {name: 'House', type: 'consumer'}, position: vector(1, 2), texture: ST.houseThatched}),

  ]
});

export const coast = case2d({
  name: 'Coast Microgrid',
  gridSize: [4, 4],
  terrainTiles: flatmapToTilesArray([
    [grass, grass, grass, grass],
    [grass, grass, grass, grass],
    [grass, grass, grass, grass],
    [water, water, water, water]
  ]),
  system: coastMicrogrid,
  structureTiles: [
    tile({data: {name: 'Diesel Generator', type: 'generator', active: false}, position: vector(0, 0), texture: ST.warehouse}),
    tile({data: {name: 'Power Grid', type: 'distributor'}, position: vector(2, 1), texture: ST.powerPole}),
    tile({data: {name: 'House1', type: 'consumer'}, position: vector(3, 2), texture: ST.houseElevated}),
    tile({data: {name: 'House2', type: 'consumer'}, position: vector(0, 2), texture: ST.communityCenter})
  ]
});

export const bigIsland = case2d({
  name: 'Big Island',
  gridSize: [4, 4],
  terrainTiles: flatmapToTilesArray([
    [grass, grass, grass, water],
    [grass, grass, grass, water],
    [grass, grass, grass, water],
    [water, water, water, water]
  ]),
  system: bigIslandMicrogrid,
  structureTiles: [
    tile({data: {name: 'Biomass', type: 'generator', active: false}, position: vector(0, 0), texture: ST.biomass}),
    tile({data: {name: 'PV Solar', type: 'generator', active: false}, position: vector(2, 0), texture: ST.pvSolar}),
    tile({data: {name: 'Power Grid', type: 'distributor'}, position: vector(1, 1), texture: ST.powerPole}),
    tile({data: {name: 'Boat', type: null}, position: vector(3, 2), texture: ST.boat}),
    tile({data: {name: 'School', type: 'consumer'}, position: vector(0, 2), texture: ST.schoolField}),
    tile({data: {name: 'House', type: 'consumer'}, position: vector(1, 2), texture: ST.houseElevated}),
    tile({data: {name: 'Cold Storage', type: 'consumer'}, position: vector(2, 2), texture: ST.warehouse})
  ]
});

export const smallIsland = case2d({
  name: 'Small Island',
  gridSize: [5, 5],
  terrainTiles: flatmapToTilesArray([
    [water, water, water, water, water],
    [water, grass, grass, grass, water],
    [water, grass, grass, grass, water],
    [water, grass, grass, grass, water],
    [water, water, water, water, water]
  ]),
  system: smallIslandMicrogrid,
  structureTiles: [
    tile({data: {name: 'Diesel Generator', type: 'generator', active: false}, position: vector(1, 1), texture: ST.dieselGenerator}),
    tile({data: {name: 'PV Solar', type: 'generator', active: false}, position: vector(3, 1), texture: ST.pvSolar}),
    tile({data: {name: 'Power Grid', type: 'distributor'}, position: vector(2, 2), texture: ST.powerPole}),
    tile({data: {name: 'Boat', type: null}, position: vector(0, 4), texture: ST.boat}),
    tile({data: {name: 'Cold Storage', type: 'consumer'}, position: vector(1, 3), texture: ST.warehouse}),
    tile({data: {name: 'Hut', type: null}, position: vector(3, 3), texture: ST.houseThatched}),
  ]
});
