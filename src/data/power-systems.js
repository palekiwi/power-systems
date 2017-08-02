import powerSystem from '../lib/power-system.js';

export const fushanMicrogrid = powerSystem({
  name: 'Fushan Microgrid',
  components: [
    {name: 'Diesel Generator', type: 'generator', data: {}},
    {name: 'House', type: 'consumer', data: {}}
  ]
});

export const qimeiMicrogrid = powerSystem({
  name: 'Qimei Microgrid',
  components: [
    {name: 'Diesel Generator', type: 'generator', data: {}},
    {name: 'House1', type: 'consumer', data: {}},
    {name: 'House2', type: 'consumer', data: {}}
  ]
});
