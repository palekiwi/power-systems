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
        {name: 'diesel', class: 'generator', type: 'non-variable', capacity: 100, priority: 0, power: null},
        {name: '', class: ''}
      ];

      const expected = [
        zipToDates([40, 40,  90, 30]),
        zipToDates([30, 50,  70, 40]),
        zipToDates([0,  10,  50,  0]),
        zipToDates([70, 80, 100, 70]),
        zipToDates([0,   0,  10,  0])
      ];

      const res = computeSystemOutput(tiles);

      expect(res.length).toEqual(tiles.length);
      expect(res.find(el => el.name == 'hospital').power).toEqual(expected[0]);
      expect(res.find(el => el.name == 'communityCenter').power).toEqual(expected[1]);
      expect(res.find(el => el.name == 'solar').power).toEqual(expected[2]);
      expect(res.find(el => el.name == 'gas').power).toEqual(expected[3]);
      expect(res.find(el => el.name == 'diesel').power).toEqual(expected[4]);
    });
  });

  describe('given primary power supplies enough power', () => {
    it('secondary and backup should output nothing', () => {
      const tiles = [
        {name: 'hospital', class: 'consumer', type: 'variable', capacity: 100, variation: zipToDates([0.1, 0.1, 0.1, 0.1]), power: null},
        {name: 'communityCenter', class: 'consumer', type: 'variable', capacity: 100, variation: zipToDates([0.1, 0.1, 0.1, 0.1]), power: null},
        {name: 'solar', class: 'generator', type: 'variable', capacity: 100, priority: 2, variation: zipToDates([0, 0.3, 0.5, 0]), power: null},
        {name: 'gas', class: 'generator', type: 'non-variable', capacity: 100, priority: 1, power: null},
        {name: 'diesel', class: 'generator', type: 'non-variable', capacity: 100, priority: 0, power: null}
      ];

      const expected = [
        zipToDates([10, 10,  10, 10]),
        zipToDates([10, 10,  10, 10]),
        zipToDates([0,  30,  50,  0]),
        zipToDates([20,  0,   0, 20]),
        zipToDates([0,   0,   0,  0])
      ];

      const res = computeSystemOutput(tiles);

      expect(res.length).toEqual(expected.length);
      expect(res.find(el => el.name == 'hospital').power).toEqual(expected[0]);
      expect(res.find(el => el.name == 'communityCenter').power).toEqual(expected[1]);
      expect(res.find(el => el.name == 'solar').power).toEqual(expected[2]);
      expect(res.find(el => el.name == 'gas').power).toEqual(expected[3]);
      expect(res.find(el => el.name == 'diesel').power).toEqual(expected[4]);
    });
  });

  describe('given structureTiles without primary power', () => {
    it('computes consumption and output of each component', () => {
      const tiles = [
        {name: 'hospital', class: 'consumer', type: 'variable', capacity: 100, variation: zipToDates([0.4, 0.4, 0.9, 0.3]), power: null},
        {name: 'communityCenter', class: 'consumer', type: 'variable', capacity: 100, variation: zipToDates([0.3, 0.5, 0.7, 0.4]), power: null},
        {name: 'gas', class: 'generator', type: 'non-variable', capacity: 100, priority: 1, power: null},
        {name: 'diesel', class: 'generator', type: 'non-variable', capacity: 100, priority: 0, power: null}
      ];

      const expected = [
        zipToDates([40, 40,  90, 30]),
        zipToDates([30, 50,  70, 40]),
        zipToDates([70, 90, 100, 70]),
        zipToDates([0,   0,  60,  0])
      ];

      const res = computeSystemOutput(tiles);

      expect(res.length).toEqual(expected.length);
      expect(res.find(el => el.name == 'hospital').power).toEqual(expected[0]);
      expect(res.find(el => el.name == 'communityCenter').power).toEqual(expected[1]);
      expect(res.find(el => el.name == 'gas').power).toEqual(expected[2]);
      expect(res.find(el => el.name == 'diesel').power).toEqual(expected[3]);
    });
  });

  describe('given array of structureTiles without load', () => {
    it('secondary power and backup output no power', () => {
      const tiles = [
        {name: 'solar', class: 'generator', type: 'variable', capacity: 100, priority: 2, variation: zipToDates([0, 0.1, 0.5, 0]), power: []},
        {name: 'gas', class: 'generator', type: 'non-variable', capacity: 100, priority: 1, power: []},
        {name: 'diesel', class: 'generator', type: 'non-variable', capacity: 100, priority: 0, power: []}
      ];

      const res = computeSystemOutput(tiles);

      expect(res.find(el => el.name == 'solar').power).toEqual(null);
      expect(res.find(el => el.name == 'gas').power).toEqual(null);
      expect(res.find(el => el.name == 'diesel').power).toEqual(null);
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
