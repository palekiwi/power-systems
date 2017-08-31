import tile from '../../lib/tile';
import vector from '../../lib/vector.js';
import * as st from '../structure-textures.js';
import * as g from '../generation/index.js';
import * as l from '../load/index.js';

export default [
  // distribution
  tile({
    position: vector(0,0),
    texture: st.powerPole,
    data: {
      name: 'Power Network',
      class: 'distributor'
    }
  }),
  // generation
  tile({
    position: vector(0,0),
    texture: st.gasEngine,
    data: {
      name: 'Gas Engine',
      class: 'generator',
      type: 'non-variable',
      priority: 1,
      capacity: 100,
      max: 200,
      variation: null,
      power: null
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.pvSolar,
    data: {
      name: 'PV Solar',
      class: 'generator',
      type: 'variable',
      priority: 2,
      capacity: 100,
      max: 200,
      variation: g.pvClear,
      power: null
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.dieselGenerator,
    data: {
      name: 'Diesel Generator',
      class: 'generator',
      type: 'non-variable',
      priority: 0,
      capacity: 100,
      max: 200,
      power: null
    }
  }),
  // consumption
  tile({
    position: vector(0,0),
    texture: st.communityCenter,
    data: {
      name: 'Community Center',
      class: 'consumer',
      capacity: 100,
      max: 200,
      variation: l.communityCenter,
      power: null
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.hospital,
    data: {
      name: 'Hospital',
      class: 'consumer',
      type: 'variable',
      capacity: 100,
      max: 200,
      variation: l.hospital,
      power: null
    }
  }),
];
