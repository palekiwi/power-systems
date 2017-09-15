/* global describe, it, expect */
import { computeOutput } from '../../lib/power-data.js';
import R from 'ramda';

const powerData = {
  'defaultLoad':    [{value: 0.3}, {value: 0.7}, {value: 0.5}, {value: 0.3}],
  'solar' :         [{value: 0.0}, {value: 0.2}, {value: 0.6}, {value: 0.0}]
};

const dates = ["01:00", "02:00", "03:00", "04:00"];

describe('computeOutput', () => {
  describe('given data with battery', () => {
    describe('with only a buffer', () => {
      it('computes energy for each component and buffer', () => {
        const data = [
          {id: 'c1', category: 'consumer',  capacity:  100, type: 'load', variation: 'defaultLoad'},
          {id: 'v1', category: 'generator', capacity:  100, type: 'variable', variation: 'solar'},
          {id: 'base', category: 'generator', capacity:  100, type: 'base', ramp: 0.1, base: 0.3},
          {id: 'bat', category: 'battery',  capacity:  100, type: 'battery', soc: 0.5, c: 3, buffer: true, ramp: 0.1, storage: false}
        ];

        const expected = {
          v1:     {power: [ 0, 20, 60,  0], energy: [   0,  833, 3333, 2500]},
          bat:    {power: [ 0, 10, 20, 10], energy: [   0,  417, 1250, 1250], buffer: [0, 10, 40, -10], buffered: [0, 416, 2083, 1250], balance: [50000, 50416, 52499, 53749]},
          c1:     {power: [30, 70, 50, 30], energy: [2500, 4167, 5000, 3333]},
          base:   {power: [30, 40, 30, 30], energy: [2500, 2917, 2917, 2500]}
        };

        let res = computeOutput(powerData, dates,data);

        expect(res.length).toEqual(expected.length);

        expect(R.pluck('energy', res.c1)).toEqual(expected.c1.energy);
        expect(R.pluck('energy', res.v1)).toEqual(expected.v1.energy);
        expect(R.pluck('energy', res.base)).toEqual(expected.base.energy);
        expect(R.pluck('energy', res.bat)).toEqual(expected.bat.energy);
        expect(R.pluck('balance', res.bat)).toEqual(expected.bat.balance);
        expect(R.pluck('buffer', res.bat)).toEqual(expected.bat.buffer);
      });
    });

    describe('with buffer and storage', () => {
      it.only('computes energy for each component and buffer', () => {
        const data = [
          {id: 'c1', category: 'consumer',    capacity:  100, type: 'load', variation: 'defaultLoad'},
          {id: 'v1', category: 'generator',   capacity:  100, type: 'variable', variation: 'solar'},
          {id: 'base', category: 'generator', capacity:  100, type: 'base', ramp: 0.1, base: 0.3},
          {id: 'bat', category: 'battery',    capacity:  100, type: 'battery', soc: 0.5, c: 3, buffer: true, ramp: 0.1, storage: true}
        ];

        const expected = {
          v1:   {power:   [ 0,  20, 60,   0], energy:   [    0,   833,  3333,  2500]},
          bat:  {power:   [ 0,  10, 20,  10], energy:   [    0,   417,  1250,  1250]},
          buff: {buffer:  [ 0,  10, 40, -10], buffered: [    0,   416,  2083,  1250]},
          c1:   {power:   [30,  70, 50,  30], energy:   [ 2500,  4167,  5000,  3333]},
          base: {power:   [30,  40, 30,  30], energy:   [ 2500,  2917,  2917,  2500]},
          stor: {storage: [ 0, -20,  0,  10], stored:   [    0,  -833,  -833,   417]},
          bal:  {balance:                               [50000, 49583, 50833, 52500]}
        };

        let res = computeOutput(powerData, dates,data);

        expect(res.length).toEqual(expected.length);

        expect(R.pluck('energy', res.c1)).toEqual(expected.c1.energy);
        expect(R.pluck('energy', res.v1)).toEqual(expected.v1.energy);
        expect(R.pluck('energy', res.base)).toEqual(expected.base.energy);
        expect(R.pluck('energy', res.bat)).toEqual(expected.bat.energy);
        expect(R.pluck('buffered', res.bat)).toEqual(expected.buff.buffered);
        expect(R.pluck('stored', res.bat)).toEqual(expected.stor.stored);
        expect(R.pluck('storage', res.bat)).toEqual(expected.stor.storage);
        expect(R.pluck('balance', res.bat)).toEqual(expected.bal.balance);
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
