/* global jest, beforeEach, describe, it, expect */
import * as types from '../../constants/actionTypes.js';
import reducer from '../../reducers/activeSceneReducer.js';
import village from '../../data/scenes/village.js';
import vector from '../../lib/vector.js';

describe('ActiveSceneReducer', () => {
  let scene = {};
  beforeEach(() => {
    scene = {
      name: 'test scene',
      structureTiles: [
        {active: false},
        {active: false}
      ]
    };
  });

  it('should handle SET_ACTIVE_SCENE', () => {
    const action = {type: types.SET_ACTIVE_SCENE, payload: scene};

    expect(reducer(undefined, action)).toEqual(scene);
  });

  it('should handle SCENE_TOGGLE_POWER', () => {
    const expected = {
      name: 'test scene',
      structureTiles: [
        {active: true},
        {active: true}
      ]
    };

    const action = {type: types.SCENE_TOGGLE_POWER, payload: true};

    expect(reducer(scene, action)).toEqual(expected);
  });

  it('should handle TOGGLE_STRUCTURE_ACTIVE', () => {
    const idx = 0;
    const expected = {
      name: 'test scene',
      structureTiles: [
        {active: true},
        {active: false}
      ]
    };

    const action = {type: types.TOGGLE_STRUCTURE_ACTIVE, payload: idx};

    expect(reducer(scene, action)).toEqual(expected);
  });

  describe('should handle SAVE_TILE', () => {
    it('given a tile exists', () => {
      const scene = {
        name: 'test scene',
        structureTiles: [
          {active: false, position: vector(0,0), texture: 'one'},
          {active: false, position: vector(0,1), texture: 'two'}
        ]
      };

      const payload = {
        type: 'structureTiles',
        position: vector(0,0),
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
      const scene = {
        name: 'test scene',
        structureTiles: [
          {active: false, position: vector(0,0), texture: 'one'},
          {active: false, position: vector(0,2), texture: 'two'}
        ]
      };

      const payload = {
        type: 'structureTiles',
        position: vector(0,1),
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
});
