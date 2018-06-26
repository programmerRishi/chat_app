import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import SignUpReducer from './SignUpReducer';
import CameraRollReducer from './CameraRollReducer';
import ChatReducer from './ChatReducer';

export default combineReducers(
  {
    logIn: LoginReducer,
    signUp: SignUpReducer,
    cameraRoll: CameraRollReducer,
    chat: ChatReducer
  }
);
