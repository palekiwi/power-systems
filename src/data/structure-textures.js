import texture from '../lib/texture.js';

export const factory = texture({
  filename: 'factory.png',
  size: [1,1,1],
});

export const factory2 = texture({
  filename: 'factory2.png',
  size: [2,1,1],
});

export const house = texture({
  filename: 'house.png',
  size: [1,1,1],
});

export const network = texture({
  filename: 'network.png',
  size: [1,1,1],
});

export const solar = texture({
  filename: 'solar.png',
  size: [2,2,1],
});

export const windGenerator = texture({
  filename: 'wind-generator.png',
  size: [1,1,1],
  frames: 30,
  loop: true
});
