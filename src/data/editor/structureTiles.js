import tile from '../../lib/tile';
import vector from '../../lib/vector.js';
import * as st from '../structure-textures.js';

export default [
  tile({
    position: vector(0,0),
    texture: st.batteryContainer,
    data: {
      name: 'Battery',
      type: 'storage',
      capacity: 100,
      max: 200
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.biomass,
    data: {
      name: 'Biomass Boiler',
      type: 'gasification',
      capacity: 100,
      max: 200
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.boat,
    data: {
      name: 'Boat',
      type: 'other',
      capacity: 100,
      max: 200
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.dieselGenerator,
    data: {
      name: 'Diesel Generator',
      type: 'generator',
      capacity: 100,
      max: 200
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.communityCenter,
    data: {
      name: 'Community Center',
      type: 'consumer',
      capacity: 100,
      max: 200
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.farm,
    data: {
      name: 'Farm',
      type: 'biomass',
      capacity: 100,
      max: 200
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.gasEngine,
    data: {
      name: 'Gas Engine',
      type: 'generator',
      capacity: 100,
      max: 200
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.hospital,
    data: {
      name: 'Hospital',
      type: 'consumer',
      capacity: 100,
      max: 200
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.powerPole,
    data: {
      name: 'Power Network',
      type: 'distributor',
      capacity: 100,
      max: 200
    }
  })
];
