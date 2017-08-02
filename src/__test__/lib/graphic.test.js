/* global describe, it, expect */
import graphic from '../../lib/graphic.js';
import vector from '../../lib/vector.js';

describe('graphic', () => {
  describe('given correct options object', () => {
    it('calculates graphic width, height and padding', () => {
      let width = 800;
      let height = 400;
      let ratio = 1.732;
      let gridSize = [3,3];
      let expected = {
        width,
        height,
        padding: [(width - (height / 5) * 3 * ratio) / 2, height / 5],
        tile: {
          width: (height / 5) * ratio,
          height: height / 5
        }
      };
      let result = graphic({gridSize, width, height});
      expect(result.tile).toEqual(expected.tile);
      expect(result.padding).toEqual(expected.padding);
    });
  });
});
