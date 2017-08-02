/* global describe, it, expect, beforeEach */
import isometricGrid from '../../lib/isometric-grid.js';
import vector from '../../lib/vector.js';



describe('isometricGrid', () => {
  let graphic = {};
  beforeEach(() => {
    graphic = {
      width: 80,
      height: 40,
      ratio: 2,
      gridSize: [2,2],
      padding: [20, 10],
      tile: {
        width: 20,
        height: 10
      }
    };
  });

  describe('given a graphic object, it returns an object with', () => {
    it('a tileCoords method', () => {
      let result = isometricGrid(graphic);
      expect(result.tileCoords(vector(0, 0))).toEqual({x: 30, y: 10});
      expect(result.tileCoords(vector(1, 0))).toEqual({x: 40, y: 15});
      expect(result.tileCoords(vector(0, 1))).toEqual({x: 20, y: 15});
      expect(result.tileCoords(vector(1, 1))).toEqual({x: 30, y: 20});
    });

    it('pointCoords method', () => {
      let result = isometricGrid(graphic);
      expect(result.pointCoords(vector(0, 0))).toEqual({x: 40, y: 10});
      expect(result.pointCoords(vector(1, 0))).toEqual({x: 50, y: 15});
      expect(result.pointCoords(vector(0, 1))).toEqual({x: 30, y: 15});
      expect(result.pointCoords(vector(1, 1))).toEqual({x: 40, y: 20});
    });
  });
});
