import tile from '../../lib/tile';
import vector from '../../lib/vector.js';
import * as tt from '../terrain-textures.js';

export default [
  tile({
    position: vector(0,0),
    texture: tt.grass,
    data: {
      name: 'grass'
    }
  }),
  tile({
    position: vector(0,0),
    texture: tt.water,
    data: {
      name: 'water'
    }
  }),
  tile({
    position: vector(0,0),
    texture: tt.dirt,
    data: {
      name: 'dirt'
    }
  })
];
