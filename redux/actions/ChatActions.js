import firebase from 'firebase';
import { MESSAGES_LOADED, TYPING_FIELD_UPDATE, SEND_MESSAGE } from './types';

export const typingFieldUpdate = (text) => {
    return { type: TYPING_FIELD_UPDATE, payload: text };
};

export const sendMessage = (userMessage) => {
  return async(dispatch) => {
    dispatch({ type: SEND_MESSAGE });
    const currentTimeInMilliseconds = (Date.now()).toString();
    const { uid } = firebase.auth().currentUser;
    const ref = firebase.database().ref(`/messages/${uid}/${currentTimeInMilliseconds}`);
    await ref.update({ sender: 'user', message: userMessage, type: 'text' });
  };
};

export const getMessageHistory = () => {
  return async(dispatch) => {
    const { uid } = firebase.auth().currentUser;
    const ref = firebase.database().ref(`/messages/${uid}`);
    ref.on('value', snapshot => {
          dispatch({ type: MESSAGES_LOADED, payload: snapshot.val() });
      }
    );
  };
};
