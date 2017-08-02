/* globals describe, it, expect */
import vector from '../../lib/vector.js';

describe('vector', () => {
  describe('returns a vector', () => {
    it('with an x and y properties', () => {
      let v = vector(1,2,3);
      expect(v.x).toEqual(1);
      expect(v.y).toEqual(2);
    });
    it('with a toString() method', () => {
      let v = vector(1, 2);
      expect(String(v)).toBe('(1,2)');
    });
  });

  describe('can compare vectors', () => {
    it('with an equals method', () => {
      let v = vector(2,2);
      let v2 = vector(2,2);

      expect(v.equals(v2)).toBe(true);
    });
  });
});
