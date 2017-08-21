import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';
import R from 'ramda';

const toggleSVModal = (bool) => ({payload} = [0,0]) => R.merge(R.__, {
  SVModal: bool,
  SVModalPosition: payload
});

export default function ui(state = initialState.ui, action) {
  switch (action.type) {

  case types.RESIZE_PANE:
    return R.assoc('resizePane', new Date(), state);

  case types.OPEN_SYSTEM_VIEWER_MODAL:
    return toggleSVModal(true)(action)(state);

  case types.CLOSE_SYSTEM_VIEWER_MODAL:
    return toggleSVModal(false)(action)(state);

  default:
    return state;
  }
}
