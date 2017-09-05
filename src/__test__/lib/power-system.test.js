/* eslint-disable no-console */
/* global jest, it, describe, expect */
import {computeSystemOutput} from '../../lib/power-system.js';
import zipWith from 'ramda/src/zipWith';
import pluck from 'ramda/src/pluck';
import compose from 'ramda/src/compose';
import propEq from 'ramda/src/propEq';
import prop from 'ramda/src/prop';
import find from 'ramda/src/find';
import tap from 'ramda/src/tap';

describe('computeSystemOutput', () => {
  const data = {
    defaultLoad: [
      {date: "00:00:00", value: 0.4},
      {date: "00:05:00", value: 0.4},
      {date: "00:10:00", value: 0.9},
      {date: "00:15:00", value: 0.3},
    ],
    solar: [
      {date: "00:00:00", value: 0.0},
      {date: "00:05:00", value: 0.1},
      {date: "00:10:00", value: 0.5},
      {date: "00:15:00", value: 0.0},
    ]
  };

  describe('given array of structureTiles', () => {
    it.only('computes consumption and output of each relevant component', () => {
      const tiles = [
        {id: 1, name: 'hospital', category: 'consumer', type: 'variable', capacity: 100, variation: 'defaultLoad', power: []},
        {id: 2, name: 'communityCenter', category: 'consumer', type: 'variable', capacity: 100, variation: 'defaultLoad', power: []},
        {id: 3, name: 'solar', category: 'generator', type: 'variable', capacity: 100, priority: 2, variation: 'solar', power: []},
        {id: 4, name: 'gas', category: 'generator', type: 'non-variable', capacity: 100, priority: 1, power: []},
        {id: 5, name: 'diesel', category: 'generator', type: 'non-variable', capacity: 100, priority: 0, power: []},
        {id: 6, name: 'other', category: 'other'}
      ];

      const expected = {
        hospital:        [40, 40,  90, 30],
        communityCenter: [40, 40,  90, 30],
        solar:           [ 0, 10,  50,  0],
        gas:             [80, 70, 100, 60],
        diesel:          [ 0,  0,  30,  0]
      };

      const res = computeSystemOutput(data, tiles);
      const power = pluckPower(res);

      expect(res.length).toEqual(tiles.length);
      expect(power('hospital')).toEqual(expected.hospital);
      expect(power('communityCenter')).toEqual(expected.communityCenter);
      expect(power('solar')).toEqual(expected.solar);
      expect(power('gas')).toEqual(expected.gas);
      expect(power('diesel')).toEqual(expected.diesel);
      expect(res.find(propEq('name', 'other')).power).toEqual(undefined);
    });
  });

  describe('given primary power supplies enough power', () => {
    it('secondary and backup should output nothing', () => {
      const tiles = [
        {id: 1, name: 'hospital', category: 'consumer', type: 'variable', capacity: 100, variation: zipToDates([0.1, 0.1, 0.1, 0.1]), power: []},
        {id: 2, name: 'communityCenter', category: 'consumer', type: 'variable', capacity: 100, variation: zipToDates([0.1, 0.1, 0.1, 0.1]), power: []},
        {id: 3, name: 'solar', category: 'generator', type: 'variable', capacity: 100, priority: 2, variation: zipToDates([0, 0.3, 0.5, 0]), power: []},
        {id: 4, name: 'gas', category: 'generator', type: 'non-variable', capacity: 100, priority: 1, power: []},
        {id: 5, name: 'diesel', category: 'generator', type: 'non-variable', capacity: 100, priority: 0, power: []}
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
        {id: 1, name: 'hospital', category: 'consumer', type: 'variable', capacity: 100, variation: zipToDates([0.4, 0.4, 0.9, 0.3]), power: []},
        {id: 2, name: 'communityCenter', category: 'consumer', type: 'variable', capacity: 100, variation: zipToDates([0.3, 0.5, 0.7, 0.4]), power: []},
        {id: 3, name: 'gas', category: 'generator', type: 'non-variable', capacity: 100, priority: 1, power: []},
        {id: 4, name: 'diesel', category: 'generator', type: 'non-variable', capacity: 100, priority: 0, power: []}
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

  describe('given there is no secondary power', () => {
    it('backup should output power', () => {
      const tiles = [
        {id: 1, name: 'hospital', category: 'consumer', type: 'variable', capacity: 100, variation: zipToDates([0.1, 0.1, 0.1, 0.1]), power: []},
        {id: 2, name: 'communityCenter', category: 'consumer', type: 'variable', capacity: 100, variation: zipToDates([0.1, 0.1, 0.1, 0.1]), power: []},
        {id: 3, name: 'solar', category: 'generator', type: 'variable', capacity: 100, priority: 2, variation: zipToDates([0, 0.3, 0.5, 0]), power: []},
        {id: 5, name: 'diesel', category: 'generator', type: 'non-variable', capacity: 100, priority: 0, power: []}
      ];

      const expected = [
        zipToDates([10, 10,  10, 10]),
        zipToDates([10, 10,  10, 10]),
        zipToDates([0,  30,  50,  0]),
        zipToDates([20,  0,   0, 20])
      ];

      const res = computeSystemOutput(tiles);

      expect(res.length).toEqual(expected.length);
      expect(res.find(el => el.name == 'hospital').power).toEqual(expected[0]);
      expect(res.find(el => el.name == 'communityCenter').power).toEqual(expected[1]);
      expect(res.find(el => el.name == 'solar').power).toEqual(expected[2]);
      expect(res.find(el => el.name == 'diesel').power).toEqual(expected[3]);
    });
  });

  describe('given array of structureTiles without load', () => {
    it('secondary power and backup output no power', () => {
      const tiles = [
        {id: 1, name: 'solar', category: 'generator', type: 'variable', capacity: 100, priority: 2, variation: zipToDates([0, 0.1, 0.5, 0]), power: []},
        {id: 2, name: 'gas', category: 'generator', type: 'non-variable', capacity: 100, priority: 1, power: []},
        {id: 3, name: 'diesel', category: 'generator', type: 'non-variable', capacity: 100, priority: 0, power: []}
      ];

      const res = computeSystemOutput(tiles);

      expect(res.find(el => el.name == 'solar').power).toEqual([]);
      expect(res.find(el => el.name == 'gas').power).toEqual([]);
      expect(res.find(el => el.name == 'diesel').power).toEqual([]);
    });
  });
});

const dates = [
  "00:00",
  "00:05",
  "00:10",
  "00:10",
];

const zipDateValue = zipWith((date, value) => ({date, value}));
const zipToDates = zipDateValue(dates);

const pluckPower = xs => s =>
  compose(
    pluck('value'),
    prop('power'),
    find(propEq('name', s))
  )(xs);
