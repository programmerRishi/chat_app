import {
  LOGIN_UPDATE,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  RESET_LOGIN,
  SIGNOUT,
  SIGNOUT_SUCCESSFULL
   } from '../actions/types';

const errorCode = ['auth/invalid-email', 'auth/wrong-password'];
const errorMessage = ['Invalid Email', 'Invalid Password'];

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  showModal: false,
  blankFieldError: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value, blankFieldError: '' };
    case RESET_LOGIN:
      return INITIAL_STATE;
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...INITIAL_STATE, loading: false };
    case LOGIN_USER_FAILED:
      for (let i = 0; i < errorCode.length; i++) {
        if (action.payload.code === errorCode[i]) {
          return { ...INITIAL_STATE, loading: false, error: errorMessage[i] };
        }
      }
      break;
    case SIGNOUT:
      return { ...INITIAL_STATE, showModal: true };
    case SIGNOUT_SUCCESSFULL:
      return { ...INITIAL_STATE, showModal: false };
    default:
      return state;
    }
};
