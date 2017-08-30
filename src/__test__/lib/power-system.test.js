/* global jest, it, describe, expect */
import {computeSystemOutput} from '../../lib/power-system.js';
import zipWith from 'ramda/src/zipWith';

describe('computeSystemOutput', () => {
  describe('given array of structureTiles', () => {
    it('computes consumption and output of each component', () => {
      const tiles = [
        {name: 'solar', class: 'generator', type: 'variable', capacity: 100, priority: 2, variation: [0, 0.1, 0.5, 0], output: null},
        {name: 'gas', class: 'generator', type: 'non-variable', capacity: 100, priority: 1, output: null},
        {name: 'diesel', class: 'generator', type: 'non-variable', capacity: 100, priority: 0, output: null},
        {name: 'hospital', class: 'consumer', type: 'variable', capacity: 100, variation: [0.4, 0.4, 0.9, 0.3], consumption: null},
        {name: 'communityCenter', class: 'consumer', type: 'variable', capacity: 100, variation: [0.3, 0.5, 0.7, 0.4], consumption: null}
      ];

      const expected = [
        zipToDates([0, 10, 50, 0]),
        zipToDates([70, 80, 90, 70]),
        zipToDates([0, 0, 70, 0]),
        zipToDates([40, 40, 90, 30]),
        zipToDates([30, 50, 70, 40])
      ];

      const res = computeSystemOutput(tiles);

      expect(res[0].output).toEqual(expected[0]);
      expect(res[1].output).toEqual(expected[1]);
      expect(res[2].output).toEqual(expected[2]);
      expect(res[3].consumption).toEqual(expected[3]);
      expect(res[4].consumption).toEqual(expected[4]);
    });
  });
});

const dates = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
];

const zipDateValue = zipWith((date, value) => ({date, value}));
const zipToDates = zipDateValue(dates);
