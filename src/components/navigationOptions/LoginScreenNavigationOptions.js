import React from 'react';
import { View } from 'react-native';

const LoginScreenNavigationOptions = () => (
      {
          title: 'LoginScreen',
          headerTitleStyle: {
            color: '#fff',
            textAlign: 'center',
            fontSize: 20,
            fontFamily: 'KalamRegular',
            fontWeight: 'normal', // add this to support custom font
            flex: 1
          },
          headerRight: <View />,
          headerLeft: <View />,
          headerStyle: {
            backgroundColor: 'rgba(0,0,0,0.9)'
          }
      }
);
export { LoginScreenNavigationOptions };
