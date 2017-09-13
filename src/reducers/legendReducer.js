import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';
import evolve from 'ramda/src/evolve';
import not from 'ramda/src/not';

export default function legend(state = initialState.legend, action) {
  switch (action.type) {

  case types.TOGGLE_LEGEND_FIELD:
    return evolve({[action.payload]: not}, state);

  default:
    return state;
  }
}
