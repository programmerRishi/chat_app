import React from 'react';
import { View, Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';

const RegisterScreenNavigationOptions = ({ navigation }) => (
      {
          title: 'SignUp',
          headerTitleStyle: {
            color: '#fff',
            textAlign: 'center',
            fontSize: 20,
            fontFamily: 'KalamRegular',
            fontWeight: 'normal', // add this to support custom font
            flex: 1
          },
          headerRight: <View />,
          headerBackImage: (
            <View style={{ paddingLeft: 7 }}>
              <Icon
              name='arrow-back'
              color='#fff'
              // textstyle={{ paddinTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5 }}
              // extraButtonStyle={{ marginTop: 5, marginBottom: 5 }}
              onPress={() => {
                // use this line for using components props in navigationOptions
                Keyboard.dismiss();
                navigation.state.params.resetFields();
                navigation.navigate('logIn');
              }
              }
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: 'rgba(0,0,0,0.9)'
          }
      }
);
export { RegisterScreenNavigationOptions };
