/* global beforeEach, jest, it, describe, expect */
import scene2d from '../../lib/scene-2d.js';
import { flatmapToTilesArray } from '../../lib/tile.js';
import vector from '../../lib/vector.js';

describe('scene2d', () => {
  let options = {};

  beforeEach(() => {
    let name = 'grid project';
    let gridSize = [2, 2];
    let terrainTiles = flatmapToTilesArray([
      [{}, {}],
      [{}, {}]
    ]);
    let system = {components: [{name: 'biomass'}]};
    let structureTiles = [
      {data: {name: 'biomass'}, texture: {size: [2, 2, 1]}, position: vector(0,0)}
    ];
    options = {name, gridSize, terrainTiles, system, structureTiles};
  });

  it('given correct data, returns case data for rendering in 2d', () => {
    expect(() => scene2d(options)).not.toThrow();
  });
});
