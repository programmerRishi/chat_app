import { ImagePicker } from 'expo';
import firebase from 'firebase';
import {
  SHOW_IMAGE_PICKER,
  SEND_PHOTO_URI,
  CANCEL_PHOTO_SENDING,
  PROGRESS } from './types';

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

export const uploadPhoto = (base64CodedImage, uploadingImageUri) => {
  return async (dispatch) => {
    const date = new Date().toISOString();
    const imageName = `CHAT${date}`.substr(0, 23);
    const { uid } = firebase.auth().currentUser;
    const storageRef = firebase.storage().ref().child(`users/${uid}/images/${imageName}.jpg`);
    const uploadTask = storageRef.putString(base64CodedImage, 'base64');
    uploadTask.on('state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
        dispatch({ type: PROGRESS, payload: { progress, uploadingImageUri } });
      }
    );
  };
};

export const cancelPhotoSending = () => {
  console.log('cancelled');
  return ({ type: CANCEL_PHOTO_SENDING });
};

export const deletePhoto = (item) => {
  return async () => {
  const { uid } = firebase.auth().currentUser;
  const databaseRef = firebase.database().ref(`/deletedMessages/${uid}/${item.timeStamp}`);
  databaseRef.update(item);
  };
};
