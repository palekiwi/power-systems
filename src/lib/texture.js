const DEFAULT_SIZE = [1,1,0];

export default function texture ({
  filename,
  size = DEFAULT_SIZE,
  frames = 1,
  loop = false,
  reverse = false
}) {
  return {filename, size, frames, loop, reverse};
}
