import { ImagePicker } from 'expo';
import firebase from 'firebase';
import {
  SHOW_IMAGE_PICKER,
  SEND_PHOTO,
  CANCEL_PHOTO_SENDING } from './types';

export const showImagePicker = () => {
  return async (dispatch) => {
      const result = await ImagePicker.launchImageLibraryAsync(
        {
          allowsEditing: false,
          mediaTypes: 'Images',
          quality: 0.4
        }
      );
      if (!result.cancelled) {
        console.log(result);
        dispatch({ type: SHOW_IMAGE_PICKER, payload: result });
      }
  };
};

export const sendPhoto = (uri) => {
  return async(dispatch) => {
    const currentTimeInMilliseconds = (Date.now()).toString();
    const { uid } = firebase.auth().currentUser;
    const ref = firebase.database().ref(`/messages/${uid}/${currentTimeInMilliseconds}`);
    await ref.update({ sender: 'user', photo: uri, type: 'image' });
    dispatch({ type: SEND_PHOTO });
  };
};

export const cancelPhotoSending = () => {
  console.log('cancelled');
  return ({ type: CANCEL_PHOTO_SENDING });
};
