/* global jest, describe, it, expect */
import * as types from '../../constants/actionTypes.js';
import reducer from '../../reducers/activeSceneReducer.js';
import village from '../../data/scenes/village.js';

describe('ActiveSceneReducer', () => {
  const scene = village;
  const getInitialState = () => null;
  const getAppState = () => scene;

  it('should handle SET_ACTIVE_SCENE', () => {
    const action = {type: types.SET_ACTIVE_SCENE, payload: scene};

    expect(reducer(getInitialState(), action)).toEqual(scene);
  });
});
