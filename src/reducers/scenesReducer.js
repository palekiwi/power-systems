import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';
import R from 'ramda';

export default function scenes(state = initialState.scenes, action) {
  switch (action.type) {
  default:
    return state;
  }
}