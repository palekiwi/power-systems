/* eslint-disable no-console */
import * as shapes from '../lib/shapes.js';

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
