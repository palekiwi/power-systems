/* global beforeEach, describe, it, expect */
import { computeOutput } from '../../lib/power-data.js';
import R from 'ramda';

const powerData = {
  'defaultLoad':    [{value: 0.3}, {value: 0.7}, {value: 0.5}, {value: 0.3}],
  'solar' :         [{value: 0.0}, {value: 0.2}, {value: 0.6}, {value: 0.0}]
};

const dates = ["01:00", "02:00", "03:00", "04:00"];

describe('computeOutput', () => {
  let data, expected, res;
  describe('given a sytem with a buffer battery', () => {
    describe('when the battery has sufficient spec', () => {

      beforeEach(() => {
        data = [
          {id: 'c1',   category: 'consumer',  capacity:  100, type: 'load',     variation: 'defaultLoad'},
          {id: 'v1',   category: 'generator', capacity:  100, type: 'variable', variation: 'solar'},
          {id: 'base', category: 'generator', capacity:  100, type: 'base',     ramp: 0.1, base: 0.3},
          {id: 'bat',  category: 'battery',   capacity:  100, type: 'battery',  soc: 0.5, c: 3, buffer: true, ramp: 0.1, storage: false}
        ];

        expected = {
          v1:    {power:  [ 0, 20, 60,   0],  energy:   [    0,   833,  3333,  2500]},
          bramp: {power:  [ 0, 10, 20,  10],  energy:   [    0,   417,  1250,  1250]},
          bbuff: {buffer: [ 0, 10, 40, -10],  buffered: [    0,   416,  2083,  1250]},
          c1:    {power:  [30, 70, 50,  30],  energy:   [ 2500,  4167,  5000,  3333]},
          base:  {power:  [30, 40, 30,  30],  energy:   [ 2500,  2917,  2917,  2500]},
          bbal:  {                            balance:  [50000, 50416, 52499, 53749]},
        };

        res = computeOutput(powerData, dates,data);
      });

      it('computes power outputs according to given ramp', () => {
        expect(R.pluck('power', res.c1)).toEqual(expected.c1.power);
        expect(R.pluck('power', res.v1)).toEqual(expected.v1.power);
        expect(R.pluck('power', res.base)).toEqual(expected.base.power);
      });

      it('computes energy outputs according to given ramp', () => {
        expect(R.pluck('energy', res.c1)).toEqual(expected.c1.energy);
        expect(R.pluck('energy', res.v1)).toEqual(expected.v1.energy);
        expect(R.pluck('energy', res.base)).toEqual(expected.base.energy);
      });

      it('computes ramped power and energy for variable power', () => {
        expect(R.pluck('power', res.bat)).toEqual(expected.bramp.power);
        expect(R.pluck('energy', res.bat)).toEqual(expected.bramp.energy);
      });

      it('computes battery buffered energy', () => {
        expect(R.pluck('balance', res.bat)).toEqual(expected.bbal.balance);
      });

      it('computes battery balance', () => {
        expect(R.pluck('balance', res.bat)).toEqual(expected.bbal.balance);
      });
    });
  });

  describe('given a system with a storage battery only', () => {
    describe('when the battery has sufficient spec', () => {
      beforeEach(() => {
        data = [
          {id: 'c1', category: 'consumer',    capacity:  100, type: 'load', variation: 'defaultLoad'},
          {id: 'v1', category: 'generator',   capacity:  100, type: 'variable', variation: 'solar'},
          {id: 'base', category: 'generator', capacity:  100, type: 'base', ramp: 0.1, base: 0.3},
          {id: 'bat', category: 'battery',    capacity:  100, type: 'battery', soc: 0.5, c: 3, buffer: false, ramp: 0.1, storage: true}
        ];

        expected = {
          c1:    {power:   [30,  70, 50,  30], energy:   [ 2500,  4167,  5000,  3333]},
          v1:    {power:   [ 0,  20, 60,   0], energy:   [    0,   833,  3333,  2500]},
          base:  {power:   [30,  40, 30,  30], energy:   [ 2500,  2917,  2917,  2500]},
          bstor: {storage: [ 0, -10, 40,   0], stored:   [    0,  -417,  1250,  1667]},
          bbal:  {balance:                               [50000, 49583, 50833, 52500]}
        };

        res = computeOutput(powerData, dates,data);
      });

      it('computes storage power', () => {
        expect(R.pluck('storage', res.bat)).toEqual(expected.bstor.storage);
      });

      it('computes stored energy', () => {
        expect(R.pluck('stored', res.bat)).toEqual(expected.bstor.stored);
      });

      it('computes battery balance', () => {
        expect(R.pluck('balance', res.bat)).toEqual(expected.bbal.balance);
      });
    });
  });

  describe('given a sytem with a single buffer and storage battery', () => {
    describe('when the battery has sufficient spec', () => {
      beforeEach(() => {
        data = [
          {id: 'c1', category: 'consumer',    capacity:  100, type: 'load', variation: 'defaultLoad'},
          {id: 'v1', category: 'generator',   capacity:  100, type: 'variable', variation: 'solar'},
          {id: 'base', category: 'generator', capacity:  100, type: 'base', ramp: 0.1, base: 0.3},
          {id: 'bat', category: 'battery',    capacity:  100, type: 'battery', soc: 0.5, c: 3, buffer: true, ramp: 0.1, storage: true}
        ];

        expected = {
          v1:    {power:   [ 0,  20, 60,   0], energy:   [    0,   833,  3333,  2500]},
          bramp: {power:   [ 0,  10, 20,  10], energy:   [    0,   417,  1250,  1250]},
          bbuff: {buffer:  [ 0,  10, 40, -10], buffered: [    0,   416,  2083,  1250]},
          c1:    {power:   [30,  70, 50,  30], energy:   [ 2500,  4167,  5000,  3333]},
          base:  {power:   [30,  40, 30,  30], energy:   [ 2500,  2917,  2917,  2500]},
          bstor: {storage: [ 0, -20,  0,  10], stored:   [    0,  -833,  -833,   417]},
          bbal:  {balance:                               [50000, 49583, 50833, 52500]}
        };

        res = computeOutput(powerData, dates,data);
      });

      it('computes power outputs for each component', () => {
        expect(R.pluck('power', res.c1)).toEqual(expected.c1.power);
        expect(R.pluck('power', res.v1)).toEqual(expected.v1.power);
        expect(R.pluck('power', res.base)).toEqual(expected.base.power);
      });

      it('computes energy for each component, storage and buffer', () => {
        expect(R.pluck('energy', res.c1)).toEqual(expected.c1.energy);
        expect(R.pluck('energy', res.v1)).toEqual(expected.v1.energy);
        expect(R.pluck('energy', res.base)).toEqual(expected.base.energy);
      });

      it('computes correct energy balance for the battery', () => {
        expect(R.pluck('balance', res.bat)).toEqual(expected.bbal.balance);
      });
    });
  });

  describe('given data without battery', () => {
  });

  describe('given data without load', () => {
  });

  describe('given data with backup', () => {
  });

  describe('given data with power-grid', () => {
  });
});
