import { ImagePicker } from 'expo';
import firebase from 'firebase';
import _ from 'lodash';
import {
  SHOW_IMAGE_PICKER,
  SEND_PHOTO_URI,
  CANCEL_PHOTO_SENDING } from './types';

export const showImagePicker = () => {
  return async (dispatch) => {
      const result = await ImagePicker.launchImageLibraryAsync(
        {
          allowsEditing: false,
          mediaTypes: 'Images',
          quality: 0.4,
          base64: true
        }
      );
      if (!result.cancelled) {
        console.log(result);
        dispatch({ type: SHOW_IMAGE_PICKER, payload: result });
      }
  };
};

export const sendPhotoUri = (uri) => {
  return async(dispatch) => {
    const currentTimeInMilliseconds = (Date.now()).toString();
    const { uid } = firebase.auth().currentUser;
    const ref = firebase.database().ref(`/messages/${uid}/${currentTimeInMilliseconds}`);
    await ref.update({ sender: 'user', photo: uri, type: 'image' });
    dispatch({ type: SEND_PHOTO_URI });
  };
};

export const uploadPhoto = (base64CodedImage) => {
  return async (dispatch) => {
    const date = new Date().toISOString();
    const imageName = `CHAT${date}`.substr(0, 23);
    const { uid } = firebase.auth().currentUser;
    const storageRef = firebase.storage().ref().child(`users/${uid}/images/${imageName}.jpg`);
    const uploadTask = storageRef.putString(base64CodedImage, 'base64');
    uploadTask.on('state_changed',
      snapshot => {
        console.log(snapshot);
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
        console.log(progress);
      }
    );
  };
};

export const cancelPhotoSending = () => {
  console.log('cancelled');
  return ({ type: CANCEL_PHOTO_SENDING });
};

export const deletePhoto = ({ oldMessagesHistory, item }) => {
  return async () => {
    _.forEach(
        oldMessagesHistory,
        (value) => {
            if (value === item) {
               const deletedElement = value;
               const { uid } = firebase.auth().currentUser;
               const databaseRef = firebase.database().ref(`/deletedMessages/${uid}/${item.timeStamp}`);
               databaseRef.update(deletedElement);
            }
        }
      );
  };
};
