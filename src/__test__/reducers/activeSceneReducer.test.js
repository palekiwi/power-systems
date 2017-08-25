/* global jest, beforeEach, describe, it, expect */
import * as types from '../../constants/actionTypes.js';
import reducer from '../../reducers/activeSceneReducer.js';
import village from '../../data/scenes/village.js';
import vector from '../../lib/vector.js';
import all from 'ramda/src/all';
import propEq from 'ramda/src/propEq';
import pluck from 'ramda/src/pluck';

describe('ActiveSceneReducer', () => {
  let scene = {};
  beforeEach(() => {
    scene = {
      name: 'test scene',
      structureTiles: [
        {active: false, position: vector(0,0), texture: 'one'},
        {active: false, position: vector(0,2), texture: 'two'}
      ]
    };
  });

  it('should handle SET_ACTIVE_SCENE', () => {
    const action = {type: types.SET_ACTIVE_SCENE, payload: scene};

    expect(reducer(undefined, action)).toEqual(scene);
  });

  it('should handle SCENE_TOGGLE_POWER', () => {
    const action = {type: types.SCENE_TOGGLE_POWER, payload: true};
    const res = reducer(scene, action);

    expect(all(propEq('active', true), res.structureTiles)).toBe(true);
  });

  it('should handle TOGGLE_STRUCTURE_ACTIVE', () => {
    const idx = 1;
    const action = {type: types.TOGGLE_STRUCTURE_ACTIVE, payload: idx};
    const res = reducer(scene, action);

    expect(pluck('active', res.structureTiles)).toEqual([false, true]);
  });

  describe('should handle SAVE_TILE', () => {
    it('given a tile exists', () => {
      const payload = {
        type: 'structureTiles',
        tile: {
          active: false, position: vector(0,0), texture: 'three'
        }
      };

      const expected = {
        name: 'test scene',
        structureTiles: [
          {active: false, position: vector(0,0), texture: 'three'},
          {active: false, position: vector(0,1), texture: 'two'}
        ]
      };

      const action = {type: types.SAVE_TILE, payload};

      expect(reducer(scene, action).structureTiles[0].texture).toEqual(expected.structureTiles[0].texture);
    });

    it('given a a tile does not exist', () => {
      const payload = {
        type: 'structureTiles',
        tile: {
          active: false, position: vector(0,1), texture: 'three'
        }
      };

      const expected = {
        name: 'test scene',
        structureTiles: [
          {active: false, position: vector(0,0), texture: 'one'},
          {active: false, position: vector(0,1), texture: 'three'},
          {active: false, position: vector(0,2), texture: 'two'}
        ]
      };

      const action = {type: types.SAVE_TILE, payload};

      expect(reducer(scene, action).structureTiles[1].texture).toEqual(expected.structureTiles[1].texture);
    });
  });

  it('should handle DELETE_TILE', () => {
    const payload = {
      type: 'structureTiles',
      position: vector(0,0)
    };

    const expected = {
      name: 'test scene',
      structureTiles: [
        {active: false, position: vector(0,2), texture: 'two'}
      ]
    };
    const action = {type: types.DELETE_TILE, payload};
    const res = reducer(scene, action);

    expect(res.structureTiles.length).toEqual(expected.structureTiles.length);
    expect(res.structureTiles[0].texture).toEqual(expected.structureTiles[0].texture);
    expect(res.structureTiles.findIndex(t => t.position.equals(vector(0,0)))).toEqual(-1);
  });

  it('should handle CROP_TO_GRID', () => {
    const payload = [2,2];

    const expected = {
      name: 'test scene',
      structureTiles: [
        {active: false, position: vector(0,0), texture: 'one'},
      ]
    };

    const action = {type: types.CROP_TO_GRID, payload};
    const res = reducer(scene, action);

    expect(res.structureTiles.length).toEqual(expected.structureTiles.length);
    expect(res.structureTiles.findIndex(t => t.position.equals(vector(0,2)))).toEqual(-1);
  });
});
