/* eslint-disable no-console */
import * as shapes from '../lib/shapes.js';
import zip from 'ramda/src/zip';

// zipGridPtsPolygonPts :: Grid -> [(Vector, PolygonPoints)]
export function zipGridPtsPolygonPts (grid) {
  return zip(grid.gridPoints(), gridPolygonPoints(grid));
}

// gridPolygonPoints :: Grid -> [PolygonPoints]
export function gridPolygonPoints (grid) {
  return shapes.fullGrid(grid)
    .map(convertToPolygonPoints);
}

// convertToPolygonPoints :: Array -> Array
function convertToPolygonPoints (array) {
  return array
    .map(Object.values)
    .join(' ');
}
