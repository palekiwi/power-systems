import vector from './vector.js';
const DEFAULT_SIZE = [1,1,0];

export default function texture ({
  filename,
  size = DEFAULT_SIZE,
  height = 1,
  width = 1,
  offsetHeight = vector(0,0)
}) {
  return {filename, size, height, width, offsetHeight};
}
