/* global describe, it, expect */
import { computeOutput } from '../../lib/power-data.js';

const powerData = {
  'defaultLoad':    [0.3, 0.7, 0.5, 0.3],
  'solar' :         [0.0, 0.2, 0.6, 0.0]
};

const dates = [{date: "01:00"}, {date: "02:00"}, {date: "03:00"}, {date: "04:00"}];

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
      c1: [{power: 30}, {power:  70}, {power:  50}, {power:   30}],
      c2: [{power: 30}, {power:  70}, {power:  50}, {power:   30}],
      v1: [{power:  0}, {power:  20}, {power:  60}, {power:    0}],
      v2: [{power:  0}, {power:  20}, {power:  60}, {power:    0}],
      gb: [{power: 60}, {power:  70}, {power:  60}, {power:   50}],
      b1: [{power:  0, buffer: 0, storage: 0},  {power: 20, buffer: 20, storage: -50}, {power: 40, buffer: 80, storage: 0}, {power: 20, buffer: -20, storage: 10}]
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
      c1: [{power: 30}, {power:  70}, {power:  50}, {power:   30}],
      v1: [{power:  0}, {power:  20}, {power:  60}, {power:    0}],
      gb: [{power: 40}, {power:  50}, {power:  40}, {power:   40}]
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
      v1: [{power:  0}, {power:  20}, {power:  60}, {power:    0}],
      gb: [{power: 40}, {power:  40}, {power:  40}, {power:   40}]
    };

    it('computes output for each component', () => {
      expect(computeOutput(powerData, dates, data)).toEqual(expected);
    });
  });
});
