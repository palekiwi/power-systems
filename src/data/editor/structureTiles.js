import vector from '../../lib/vector.js';
import * as tc from '../../helpers/tile-creators.js';

export default [
  // distribution
  tc.powerPole({
    position: vector(0,0),
  }),
  // battery
  tc.battery({
    position: vector(0,0),
  }),
  // generation
  tc.gas({
    position: vector(0,0),
    data: {
      capacity: 100,
    }
  }),
  tc.solar({
    position: vector(0,0),
    data: {
      capacity: 100,
    }
  }),
  tc.diesel({
    position: vector(0,0),
    data: {
      capacity: 100
    }
  }),
  // consumption
  tc.communityCenter({
    position: vector(0,0),
    data: {
      capacity: 100
    }
  }),
  tc.hospital({
    position: vector(0,0),
    data: {
      capacity: 100
    }
  }),
];
