import firebase from 'firebase';
import {
  SIGNUP_UPDATE,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  RESET_FIELDS,
  SIGNUP_FAILED
} from './types';

export const signupUpdate = ({ prop, value }) => {
  return {
     type: SIGNUP_UPDATE,
     payload: { prop, value }
   };
};

export const resetFields = () => {
  return {
    type: RESET_FIELDS
  };
};


export const registerUser = (email, password, navigation) => {
  return (dispatch) => {
    const checkIfEmptyValues = email && password;
    if (checkIfEmptyValues) {
      dispatch({ type: CREATE_USER });

      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('user created');
        dispatch({ type: CREATE_USER_SUCCESS });
        navigation.navigate('chat');
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: SIGNUP_FAILED, payload: error.message });
      });
    } else {
      console.log('field is empty');
      dispatch({ type: SIGNUP_FAILED, payload: 'SOME FIELDS ARE EMPTY!' });
    }
  };
};
