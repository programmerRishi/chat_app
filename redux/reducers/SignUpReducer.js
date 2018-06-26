import {
  SIGNUP_UPDATE,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  RESET_FIELDS,
  SIGNUP_FAILED } from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value, blankFieldError: '' };
    case RESET_FIELDS:
        return INITIAL_STATE;
    case CREATE_USER:
      return { ...state, loading: true };
    case CREATE_USER_SUCCESS:
      return { ...INITIAL_STATE, loading: false };
    case SIGNUP_FAILED:
      return { ...INITIAL_STATE, error: action.payload };
    default:
      return state;
    }
};
