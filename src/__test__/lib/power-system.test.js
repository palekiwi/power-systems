/* global jest, it, describe, expect */
import powerSystem from '../../lib/power-system.js';

describe('powerSystem', () => {
  describe('given a name and an array of power components', () => {
    it('returns an object with name and components', () => {
      let name = 'system';
      let components = [{name: 'one', type: 'producer'}];
      let system = powerSystem({name, components});
      expect(system.components).toEqual(components);
    });
  });
});
