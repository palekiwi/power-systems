import powerSystem from '../lib/power-system.js';

export const villageMicrogrid = powerSystem({
  name: 'Village Microgrid',
  components: [
    {name: 'Diesel Generator', type: 'generator', data: {}},
    {name: 'House', type: 'consumer', data: {}}
  ]
});

export const coastMicrogrid = powerSystem({
  name: 'Coast Microgrid',
  components: [
    {name: 'Diesel Generator', type: 'generator', data: {}},
    {name: 'House1', type: 'consumer', data: {}}
  ]
});

export const bigIslandMicrogrid = powerSystem({
  name: 'Big Island',
  components: [
    {name: 'Biomass', type: 'generator', data: {}},
    {name: 'House', type: 'consumer', data: {}},
    {name: 'PV Solar', type: 'generator', data: {}},
    {name: 'Boat', type: 'consumer', data: {}},
    {name: 'Cold Storage', type: 'consumer', data: {}}
  ]
});

export const smallIslandMicrogrid = powerSystem({
  name: 'Big Island',
  components: [
    {name: 'Hut', type: 'consumer', data: {}},
    {name: 'PV Solar', type: 'generator', data: {}},
    {name: 'Diesel Generator', type: 'generator', data: {}},
    {name: 'Boat', type: 'consumer', data: {}}
  ]
});
