import {
  KEYBOARD_DID_SHOW,
  KEYBOARD_DID_HIDE
} from './types';

export const onKeyboardShow = (keyboardHeight) => {
  return { type: KEYBOARD_DID_SHOW, payload: keyboardHeight };
};

export const onKeyBoardHide = () => {
  return { type: KEYBOARD_DID_HIDE };
};
