/* global describe, it, expect */
import { computeOutput } from '../../lib/power-data.js';

const powerData = {
  'defaultLoad':    [{value: 0.3}, {value: 0.7}, {value: 0.5}, {value: 0.3}],
  'solar' :         [{value: 0.0}, {value: 0.2}, {value: 0.6}, {value: 0.0}]
};

const dates = ["01:00", "02:00", "03:00", "04:00"];

describe('computeOutput', () => {
  describe('given data with battery', () => {
    const data = [
      {id: 'c1', category: 'consumer',  capacity: 100, type: 'load', variation: 'defaultLoad'},
      {id: 'c2', category: 'consumer',  capacity: 100, type: 'load', variation: 'defaultLoad'},
      {id: 'v1', category: 'generator', capacity: 100, type: 'variable', variation: 'solar'},
      {id: 'v2', category: 'generator', capacity: 100, type: 'variable', variation: 'solar'},
      {id: 'gb', category: 'generator', capacity: 100, type: 'base', ramp: 0.1, base: 0.3},
      {id: 'b1',  category: 'battery', type: 'battery', buffer: true, ramp: 0.1, storage: true}
    ];

    const expected = {
      c1: [{date: "01:00", power: 30}, {date: "02:00", power:  70}, {date: "03:00", power:  50}, {date: "04:00", power:   30}],
      c2: [{date: "01:00", power: 30}, {date: "02:00", power:  70}, {date: "03:00", power:  50}, {date: "04:00", power:   30}],
      v1: [{date: "01:00", power:  0}, {date: "02:00", power:  20}, {date: "03:00", power:  60}, {date: "04:00", power:    0}],
      v2: [{date: "01:00", power:  0}, {date: "02:00", power:  20}, {date: "03:00", power:  60}, {date: "04:00", power:    0}],
      gb: [{date: "01:00", power: 60}, {date: "02:00", power:  70}, {date: "03:00", power:  60}, {date: "04:00", power:   50}],
      b1: [{date: "01:00", power:  0, buffer: 0, storage: 0},  {date: "02:00", power: 20, buffer: 20, storage: -50}, {date: "03:00", power: 40, buffer: 80, storage: 0}, {date: "04:00", power: 20, buffer: -20, storage: 10}]
    };

    it.only('computes output for each component', () => {
      expect(computeOutput(powerData, dates, data)).toEqual(expected);
    });
  });

  describe('given data without battery', () => {
    const data = [
      {id: 'c1', category: 'consumer',  capacity: 100, type: 'load', variation: 'defaultLoad'},
      {id: 'v1', category: 'generator', capacity: 100, type: 'variable', variation: 'solar'},
      {id: 'gb', category: 'generator', capacity: 100, type: 'base', ramp: 0.1, base: 0.4}
    ];

    const expected = {
      c1: [{date: "01:00", power: 30}, {date: "02:00", power:  70}, {date: "03:00", power:  50}, {date: "04:00", power:   30}],
      v1: [{date: "01:00", power:  0}, {date: "02:00", power:  20}, {date: "03:00", power:  60}, {date: "04:00", power:    0}],
      gb: [{date: "01:00", power: 40}, {date: "02:00", power:  50}, {date: "03:00", power:  40}, {date: "04:00", power:   40}]
    };

    it('computes output for each component', () => {
      expect(computeOutput(powerData, dates, data)).toEqual(expected);
    });
  });

  describe('given data without load', () => {
    const data = [
      {id: 'v1', category: 'generator', capacity: 100, type: 'variable', variation: 'solar'},
      {id: 'gb', category: 'generator', capacity: 100, type: 'base', ramp: 0.1, base: 0.4}
    ];

    const expected = {
      v1: [{date: "01:00", power:  0}, {date: "02:00", power:  20}, {date: "03:00", power:  60}, {date: "04:00", power:    0}],
      gb: [{date: "01:00", power: 40}, {date: "02:00", power:  40}, {date: "03:00", power:  40}, {date: "04:00", power:   40}]
    };

    it('computes output for each component', () => {
      expect(computeOutput(powerData, dates, data)).toEqual(expected);
    });
  });

  describe('given data with backup', () => {
    const data = [
      {id: 'c1', category: 'consumer',  capacity: 200, type: 'load', variation: 'defaultLoad'},
      {id: 'base', category: 'generator', capacity: 100, type: 'base', ramp: 0.1, base: 0.3},
      {id: 'backup', category: 'generator', capacity: 100, type: 'backup', ramp: 0.1, base: 0.3},
    ];

    const expected = {
      c1:       [{date: "01:00", power: 60}, {date: "02:00", power:  140}, {date: "03:00", power:  100}, {date: "04:00", power:   60}],
      base:     [{date: "01:00", power: 60}, {date: "02:00", power:   70}, {date: "03:00", power:   80}, {date: "04:00", power:   70}],
      backup:   [{date: "01:00", power:  0}, {date: "02:00", power:   70}, {date: "03:00", power:   60}, {date: "04:00", power:   50}],
    };

    it('computes output for each component', () => {
      expect(computeOutput(powerData, dates, data)).toEqual(expected);
    });
  });

  describe('given data with power-grid', () => {
    const data = [
      {id: 'c1', category: 'consumer',  capacity: 200, type: 'load', variation: 'defaultLoad'},
      {id: 'base', category: 'generator', capacity: 100, type: 'base', ramp: 0.1, base: 0.3},
      {id: 'grid', category: 'grid', type: 'grid'},
      {id: 'backup', category: 'generator', capacity: 100, type: 'backup', ramp: 0.1, base: 0.3},
    ];

    const expected = {
      c1:     [{date: "01:00", power: 60}, {date: "02:00", power:  140}, {date: "03:00", power:  100}, {date: "04:00", power:   60}],
      base:   [{date: "01:00", power: 60}, {date: "02:00", power:   70}, {date: "03:00", power:   80}, {date: "04:00", power:   70}],
      grid:   [{date: "01:00", power:  0}, {date: "02:00", power:   70}, {date: "03:00", power:   20}, {date: "04:00", power:    0}],
      backup: [{date: "01:00", power:  0}, {date: "02:00", power:    0}, {date: "03:00", power:    0}, {date: "04:00", power:    0}]
    };

    it('computes output for each component', () => {
      expect(computeOutput(powerData, dates, data)).toEqual(expected);
    });
  });

  describe('given data without battery', () => {
    const data = [
      {id: 'c1', category: 'consumer',  capacity: 100, type: 'load', variation: 'defaultLoad'},
      {id: 'v1', category: 'generator', capacity: 100, type: 'variable', variation: 'solar'},
      {id: 'gb', category: 'generator', capacity: 100, type: 'base', ramp: 0.1, base: 0.4}
    ];

    const expected = {
      c1: [{date: "01:00", power: 30}, {date: "02:00", power:  70}, {date: "03:00", power:  50}, {date: "04:00", power:   30}],
      v1: [{date: "01:00", power:  0}, {date: "02:00", power:  20}, {date: "03:00", power:  60}, {date: "04:00", power:    0}],
      gb: [{date: "01:00", power: 40}, {date: "02:00", power:  50}, {date: "03:00", power:  40}, {date: "04:00", power:   40}]
    };

    it('computes output for each component', () => {
      expect(computeOutput(powerData, dates, data)).toEqual(expected);
    });
  });
});
