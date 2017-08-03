import vector from './vector.js';

const square = [vector(0,0), vector(0,1), vector(1,1), vector(1,0)];

export function gridTile (grid, origin = vector(0,0)) {
  return square
    .map(v => v.plus(origin))
    .map(v => grid.pointCoords(v));
}

export function fullGrid (grid) {
  return grid.gridPoints()
    .map(p => gridTile(grid, p));
}
