import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

const ChatScreenNavigationOptions = ({ navigation }) => (
      {
          title: 'Chat With Admin',
          headerTitleStyle: {
            color: '#fff',
            textAlign: 'center',
            fontSize: 20,
            fontFamily: 'KalamRegular',
            fontWeight: 'normal', // add this to support custom font
            flex: 1
          },
          headerRight: (
            <Icon
              name='sign-out'
              type='font-awesome'
              raised
              size={20}
              onPress={() => navigation.state.params.signOut({ navigation })}
            />
          ),
          headerLeft: <View />,
          headerStyle: {
            backgroundColor: 'rgba(0,0,0,0.9)'
          }
      }
);
export { ChatScreenNavigationOptions };
