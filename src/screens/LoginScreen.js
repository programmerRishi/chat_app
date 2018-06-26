  import React, { Component } from 'react';
  import {
    View,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
    LayoutAnimation,
    UIManager } from 'react-native';
  import {
    FormLabel,
    FormValidationMessage,
    FormInput,
    Card,
    Button,
    Icon } from 'react-native-elements';
  import { connect } from 'react-redux';
  import firebase from 'firebase';
  import * as actions from '../../redux/actions';
  import { LoginScreenNavigationOptions } from '../components/navigationOptions';
  import { CustomModal } from '../components/CustomModal';


    UIManager.setLayoutAnimationEnabledExperimental
      && UIManager.setLayoutAnimationEnabledExperimental(true);

  class LoginScreen extends Component {
    static navigationOptions = LoginScreenNavigationOptions;

    state = { eyeIconName: 'eye', hidePassword: true, top: 15, toCheckLogin: true };

    componentWillMount() {
      firebase.auth().onAuthStateChanged(
        user => {
          if (user) this.props.navigation.navigate('chat');
          else this.setState({ toCheckLogin: false });
        }
      );
    }
    componentWillUpdate() {
        // console.log(LayoutAnimation);// see the Presets property
        LayoutAnimation.configureNext(
          {
            duration: 150,
            create: { type: 'linear', property: 'opacity' },
            update: { type: 'linear' }
          }
        );
    }

    onSignInButtonPress = () => {
      const { email, password, navigation } = this.props;
      this.props.loginOrganiser(email, password, navigation);
      Keyboard.dismiss(); // can also be used Keyboard.dismiss ie without curly braces
      // to use without the curly braces use it directly as a value for 'onPress' prop
    }

    onLoading = () => {
      const { loading } = this.props;
      if (loading) {
        return (
          <ActivityIndicator
           size='large'
           color='#000'
          />
        );
      }
      return (
        <Button
          title='SignIn'
          fontFamily='KalamRegular'
          large
          backgroundColor='#242424'
          onPress={this.onSignInButtonPress}
          rounded
        />
      );
    }

    showError = () => {
      if (this.props.error.length >= 13) {
        // this code below in the if section is for the error to animated in and out of the screen
        setTimeout(() => this.setState({ top: -30 }), 1000);
        setTimeout(() => { this.props.resetLogin(); this.setState({ top: 15 }); }, 1200);
        return (
          <FormValidationMessage
            labelStyle={{ fontFamily: 'KalamRegular', fontSize: 18, textAlign: 'center' }}
            containerStyle={{ position: 'absolute', top: this.state.top, elevation: 5 }}
          >
          {this.props.error}
          </FormValidationMessage>
        );
      }
      return (
        //for stacking elements on top use elevation instead of zIndex
        <FormValidationMessage
          labelStyle={{ fontFamily: 'KalamRegular', fontSize: 18, textAlign: 'center' }}
          containerStyle={{ position: 'absolute', top: -30, elevation: 5 }}
        >
        {this.props.error}
        </FormValidationMessage>
      );
    }

    render() {
      const { width } = Dimensions.get('window');
      const { viewContainerStyle, cardContainerStyle, wrapperStyle, labelStyle } = styles;
      if (this.state.toCheckLogin) {
        return (
            <CustomModal
              showModal={this.state.toCheckLogin}
              modalMessage='Checking if you are already SignedIn'
              backgroundColor='#DEDEDE'
            />
        );
      }
      return (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={viewContainerStyle}>
              {this.showError()}
              <Card containerStyle={cardContainerStyle} wrapperStyle={wrapperStyle}>
                  <Icon
                    type='font-awesome'
                    name={this.state.eyeIconName}
                    size={25}
                    containerStyle={styles.eyeIconStyle}
                    onPress={
                      () => {
                        const eyeIconName = this.state.eyeIconName;
                        eyeIconName === 'eye' ? this.setState({ eyeIconName: 'eye-slash', hidePassword: false }) : this.setState({ eyeIconName: 'eye', hidePassword: true });
                      }
                    }
                  />
                  <FormLabel labelStyle={labelStyle}>
                      Email
                  </FormLabel>
                  <FormInput
                    containerStyle={{ width: 300 }}
                    inputStyle={styles.inputStyle}
                    autoFocus
                    onChangeText={(text) => this.props.loginUpdate({ prop: 'email', value: text })}
                    onSubmitEditing={() => this.password.focus()}
                    value={this.props.email}
                  />
                  <FormLabel labelStyle={labelStyle}>
                      Password
                  </FormLabel>
                  <FormInput
                    containerStyle={{ width: 270 }}
                    inputStyle={styles.inputStyle}
                    secureTextEntry={this.state.hidePassword}
                    ref={(password) => (this.password = password)}
                    onChangeText={(text) => this.props.loginUpdate({ prop: 'password', value: text })}
                    value={this.props.password}
                  />
                  {this.onLoading()}
                  <View style={styles.signUpButtonAndTextContainerStyles}>
                      <Text style={styles.newUserTextStyle}>NewUser??</Text>
                      <Button
                        containerViewStyle={{ width: (width / 4) }}
                        title='SignUp'
                        fontFamily='KalamRegular'
                        backgroundColor='#242424'
                        onPress={() => this.props.navigation.navigate('register')}
                        rounded
                      />
                  </View>
              </Card>
            </View>
          </TouchableWithoutFeedback>
      );
    }
  }
  const styles = {
      cardContainerStyle: {
        borderWidth: 2,
      },
      labelStyle: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'KalamRegular'
      },
      inputStyle: {
        fontSize: 15,
        color: '#000'
      },
      viewContainerStyle: {
        flex: 1,
        backgroundColor: '#DEDEDE',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      eyeIconStyle: {
        position: 'absolute',
        top: 135,
        right: 10
      },
      signUpButtonAndTextContainerStyles: {
        backgroundColor: '#DEDEDE',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'baseline',
        marginTop: 15
      },
      newUserTextStyle: {
        fontSize: 20,
      }
  };

  const mapStateToProps = ({ logIn }) => {
    const { email, password, loading, error } = logIn;
    return { email, password, loading, error };
  };

  export default connect(mapStateToProps, actions)(LoginScreen);
