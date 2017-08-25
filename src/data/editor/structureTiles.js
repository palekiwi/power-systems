import tile from '../../lib/tile';
import vector from '../../lib/vector.js';
import * as st from '../structure-textures.js';

export default [
  tile({
    position: vector(0,0),
    texture: st.batteryContainer,
    data: {
      name: 'Battery'
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.biomass,
    data: {
      name: 'Biomass Boiler'
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.boat,
    data: {
      name: 'Boat'
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.dieselGenerator,
    data: {
      name: 'Diesel Generator'
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.communityCenter,
    data: {
      name: 'Community Center'
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.farm,
    data: {
      name: 'Farm'
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.gasEngine,
    data: {
      name: 'Gas Engine'
    }
  }),
  tile({
    position: vector(0,0),
    texture: st.hospital,
    data: {
      name: 'Hospital'
    }
  })
];
