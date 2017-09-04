import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';
import assoc from 'ramda/src/assoc';

export default function ui(state = initialState.ui, action) {
  switch (action.type) {

  case types.RESIZE_PANE:
    return assoc('resizePane', new Date(), state);

  case types.SET_VIEWER_MODE:
    return assoc('viewerMode', action.payload, state);

  default:
    return state;
  }
}
