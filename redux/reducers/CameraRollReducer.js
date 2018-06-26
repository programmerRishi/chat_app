import { SHOW_IMAGE_PICKER, SEND_PHOTO, CANCEL_PHOTO_SENDING } from '../actions/types';

const INITIAL_STATE = { width: 10, height: 10, uri: '', showModal: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_IMAGE_PICKER: {
      const { width, height, uri } = action.payload;
      return { width, height, uri, showModal: true, hideStatusBar: true };
    }
    case SEND_PHOTO: {
      return INITIAL_STATE;
    }
    case CANCEL_PHOTO_SENDING: {
      return INITIAL_STATE;
    }
    default: {
      return INITIAL_STATE;
    }
  }
};
