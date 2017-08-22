/* global jest, beforeEach, describe, it, expect */
import * as types from '../../constants/actionTypes.js';
import reducer from '../../reducers/activeSceneReducer.js';
import village from '../../data/scenes/village.js';

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
});
