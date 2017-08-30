import tile from '../../lib/tile';
import vector from '../../lib/vector.js';
import * as st from '../structure-textures.js';
import * as g from '../generation/index.js';
import * as l from '../load/index.js';

export default [
  tile({
    position: vector(0,0),
    texture: st.batteryContainer,
    data: {
      name: 'Battery',
      class: 'storage',
      capacity: 100,
      max: 200
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.biomass,
    data: {
      name: 'Biomass Boiler',
      class: 'gasification',
      capacity: 100,
      max: 200
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.gasEngine,
    data: {
      name: 'Gas Engine',
      class: 'generator',
      capacity: 100,
      max: 200,
      variation: null
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.boat,
    data: {
      name: 'Boat',
      class: 'other',
      capacity: 100,
      max: 200
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.boat,
    data: {
      name: 'Boat',
      class: 'other',
      capacity: 100,
      max: 200
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
      variation: null,
      output: null
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.dieselGenerator,
    data: {
      name: 'Diesel Generator',
      class: 'generator',
      capacity: 100,
      max: 200
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.communityCenter,
    data: {
      name: 'Community Center',
      class: 'consumer',
      capacity: 100,
      max: 200
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.farm,
    data: {
      name: 'Farm',
      class: 'biomass',
      capacity: 100,
      max: 200
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.gasEngine,
    data: {
      name: 'Gas Engine',
      class: 'generator',
      capacity: 100,
      max: 200
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.hospital,
    data: {
      name: 'Hospital',
      class: 'consumer',
      capacity: 100,
      max: 200
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.powerPole,
    data: {
      name: 'Power Network',
      class: 'distributor',
      capacity: 100,
      max: 200
    }
  })
];
