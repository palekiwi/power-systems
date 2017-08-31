/* global jest, it, describe, expect */
import {computeSystemOutput} from '../../lib/power-system.js';
import zipWith from 'ramda/src/zipWith';

describe('computeSystemOutput', () => {
  describe('given array of structureTiles', () => {
    it('computes consumption and output of each component', () => {
      const tiles = [
        {name: 'hospital', class: 'consumer', type: 'variable', capacity: 100, variation: zipToDates([0.4, 0.4, 0.9, 0.3]), power: null},
        {name: 'communityCenter', class: 'consumer', type: 'variable', capacity: 100, variation: zipToDates([0.3, 0.5, 0.7, 0.4]), power: null},
        {name: 'solar', class: 'generator', type: 'variable', capacity: 100, priority: 2, variation: zipToDates([0, 0.1, 0.5, 0]), power: null},
        {name: 'gas', class: 'generator', type: 'non-variable', capacity: 100, priority: 1, power: null},
        {name: 'diesel', class: 'generator', type: 'non-variable', capacity: 100, priority: 0, power: null}
      ];

      const expected = [
        zipToDates([40, 40, 90, 30]),
        zipToDates([30, 50, 70, 40]),
        zipToDates([0,  10, 50,  0]),
        zipToDates([70, 80, 90, 70]),
        zipToDates([0,   0, 20,  0])
      ];

      const res = computeSystemOutput(tiles);

      expect(res.length).toEqual(expected.length);
      expect(res[0].power).toEqual(expected[0]);
      expect(res[1].power).toEqual(expected[1]);
      expect(res[2].power).toEqual(expected[2]);
      expect(res[3].power).toEqual(expected[3]);
      expect(res[4].power).toEqual(expected[4]);
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
