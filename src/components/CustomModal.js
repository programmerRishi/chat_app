import React from 'react';
import {
  View,
  Text,
  Modal,
  Platform,
  ActivityIndicator } from 'react-native';

const CustomModal = (props) => {
    const { modalViewStyle, modalTextStyle } = styles;
    const spinnerSize = Platform.OS === 'android' ? 100 : 1;
    return (
        <Modal
        visible={props.showModal}
        transparent
        animationType='fade'
        onRequestClose={() => {}}// it is must for android app
        >
            <View style={[modalViewStyle, { alignItems: 'flex-end' }]}>
              <Text style={modalTextStyle}>{props.modalMessage}</Text>
            </View>
            <View style={modalViewStyle}>
              <ActivityIndicator
              color='#000'
              size={spinnerSize}
              />
            </View>
        </Modal>
    );
};

const styles = {
  modalViewStyle: {
    borderWidth: 0,
    flexDirection: 'row',
    flex: 1,
    position: 'relative',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)'
  },
   modalTextStyle: {
     flex: 1,
     textAlign: 'center',
     lineHeight: 100,
     fontSize: 40,
     fontFamily: 'KalamRegular',
     color: '#000'
   }
};

export { CustomModal };
