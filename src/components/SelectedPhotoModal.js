import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Modal } from 'react-native';
import { Icon } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

const SelectedPhotoModal = ({ uri, base64, showModal, sendPhotoUri, uploadPhoto, onBackIconPress }) => {
    // both the icon tags should be place after image tag otherwise the touch on icon won't work
    return (
        <Modal
        visible={showModal}
        transparent
        animationType='fade'
        onRequestClose={() => {}}// it is must for android app
        >
          <View style={{ width, height, backgroundColor: '#fff' }}>
            <Image
              source={{ uri }}
              style={{ resizeMode: 'contain', width, height }}
            />
            <Icon
              name='arrow-back'
              size={30}
              containerStyle={styles.backIconContainerStyle}
              onPress={onBackIconPress}
            />
            <Icon
              name='paper-plane'
              type='font-awesome'
              size={30}
              containerStyle={styles.sendIconContainerStyle}
              onPress={
                () => {
                  sendPhotoUri(uri);
                  uploadPhoto(base64, uri);
                }
              }
              raised
            />
          </View>
        </Modal>
    );
};

const styles = {
  sendIconContainerStyle: {
    position: 'absolute',
    right: 40,
    bottom: 100,
    paddingRight: 3
  },
  backIconContainerStyle: {
    position: 'absolute',
    left: 20,
    top: 20
  }
};

export { SelectedPhotoModal };
