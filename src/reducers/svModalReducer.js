import initialState from './initialState.js';
import * as types from '../constants/actionTypes.js';
import R from 'ramda';

const toggleSVModal = (bool) => ({payload}) =>
  R.merge(R.__, {
    show: bool,
    position: payload
  });

export default function SVModal(state = initialState.SVModal, action) {
  switch (action.type) {

  case types.OPEN_SYSTEM_VIEWER_MODAL:
    return toggleSVModal(true)(action)(state);

  case types.CLOSE_SYSTEM_VIEWER_MODAL:
    return toggleSVModal(false)(action)(state);

  default:
    return state;
  }
}
