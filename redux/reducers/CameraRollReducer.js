import { SHOW_IMAGE_PICKER, SEND_PHOTO_URI, CANCEL_PHOTO_SENDING } from '../actions/types';

const INITIAL_STATE = { width: 10, height: 10, uri: '', showModal: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_IMAGE_PICKER: {
      const { width, height, uri, base64 } = action.payload;
      return { width, height, uri, base64, showModal: true, hideStatusBar: true };
    }
    case SEND_PHOTO_URI: {
      return INITIAL_STATE;
    }
    case CANCEL_PHOTO_SENDING: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};
