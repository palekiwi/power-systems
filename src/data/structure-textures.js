import texture from '../lib/texture.js';
import vector from '../lib/vector.js';

export const factory = texture({
  filename: 'factory.png',
  height: 2,
  offsetHeight: vector(-1, -1)
});

export const factory2 = texture({
  filename: 'factory2.png',
  size: [2,1,1],
  height: 2.5,
  width: 1.5,
  offsetHeight: vector(-1, -1)
});

export const house = texture({
  filename: 'house.png',
  size: [1,1,1],
  height: 2,
  offsetHeight: vector(-1, -1)
});

export const solar = texture({
  filename: 'solar.png',
  size: [2,2,1],
  height: 2,
  offsetHeight: vector(-1, -1)
});
