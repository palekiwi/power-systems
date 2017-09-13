import * as types from '../constants/actionTypes.js';

export function toggleLegendField (payload) {
  return {
    type: types.TOGGLE_LEGEND_FIELD,
    payload
  };
}
