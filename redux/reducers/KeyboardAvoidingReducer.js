import {
  KEYBOARD_DID_SHOW,
  KEYBOARD_DID_HIDE } from '../actions/types';

const INITIAL_STATE = { addPaddingBottom: 0 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case KEYBOARD_DID_SHOW:
      return { addPaddingBottom: action.payload };
    case KEYBOARD_DID_HIDE:
      return { addPaddingBottom: 0 };
    default:
      return state;
  }
};
