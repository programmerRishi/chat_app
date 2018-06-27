import firebase from 'firebase';
import _ from 'lodash';
import {
  FINAL_MESSAGES,
  DELETED_MESSAGES_LOADED,
  MESSAGES_LOADED,
  TYPING_FIELD_UPDATE,
  SEND_MESSAGE } from './types';

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

export const deleteMessage = (item) => {
  return async () => {
      const { uid } = firebase.auth().currentUser;
      const databaseRef = firebase.database().ref(`/deletedMessages/${uid}/${item.timeStamp}`);
      databaseRef.update(item);
  };
};

export const getFinalMessageHistory = ({ deletedMessagesHistory, oldMessagesHistory }) => {
  return async (dispatch) => {
    if (deletedMessagesHistory !== null || oldMessagesHistory !== null) {
      const temporaryArray = oldMessagesHistory;
          //photo is the key in deletedMessagesHistory object
      _.pullAllBy(temporaryArray, deletedMessagesHistory, 'timeStamp');
      console.log(temporaryArray);
      dispatch({ type: FINAL_MESSAGES, payload: temporaryArray });
      return;
    }
    dispatch({ type: FINAL_MESSAGES, payload: null });
  };
};

export const getDeletedMessageHistory = () => {
  return async(dispatch) => {
    const { uid } = firebase.auth().currentUser;
    const databaseRef = firebase.database().ref(`/deletedMessages/${uid}`);
    console.log(databaseRef);
    databaseRef.on(
      'value',
       snapshot => {
          dispatch({ type: DELETED_MESSAGES_LOADED, payload: snapshot.val() });
      }
    );
  };
};

export const getMessageHistory = () => {
  return async(dispatch) => {
    const { uid } = firebase.auth().currentUser;
    const databaseRef = firebase.database().ref(`/messages/${uid}`);
    databaseRef.on(
      'value',
      snapshot => {
          dispatch({ type: MESSAGES_LOADED, payload: snapshot.val() });
      }
    );
  };
};
