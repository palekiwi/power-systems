import graphic from './graphic.js';
import vector from './vector.js';

export default function isometricGrid ({width = 0, height = 0, gridSize = [0,0], ratio = 1.732, minPadding = 1}) {
  let {tile, padding} = graphic({width, height, gridSize, ratio, minPadding});

  const gridPoints = () => {
    let pts = [];
    for (let x=0; x<gridSize[0]; x++) {
      for (let y=0; y<gridSize[1]; y++) {
        pts.push(vector(x,y));
      }
    }

    return pts;
  };

  const pointCoords = vector =>  {
    return {
      x: padding[0] + tile.width / 2 * (gridSize[1] + vector.x - vector.y),
      y: padding[1] + tile.height / 2 * (vector.x + vector.y)
    };
  };

  const tileCoords = vector => {
    return {
      x: pointCoords(vector).x - tile.width / 2,
      y: pointCoords(vector).y
    };
  };

  const proto =  {
    tile,
    gridSize,
    gridPoints,
    tileCoords,
    pointCoords
  };

  return Object.create(proto);
}
