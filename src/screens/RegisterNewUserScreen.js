  import React, { Component } from 'react';
  import {
    View,
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
  import * as actions from '../../redux/actions';
  import { RegisterScreenNavigationOptions } from '../components/navigationOptions';

  UIManager.setLayoutAnimationEnabledExperimental
      && UIManager.setLayoutAnimationEnabledExperimental(true);

class RegisterNewUserScreen extends Component {
  static navigationOptions = RegisterScreenNavigationOptions;

  state = { eyeIconName: 'eye', hidePassword: true, top: 15 };

    componentWillMount() {
      this.props.navigation.setParams(
        {
          resetFields: this.props.resetFields
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
    onSignUpButtonPress = () => {
      const { email, password, navigation } = this.props;
      this.props.registerUser(email, password, navigation);
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
          title='SignUp'
          fontFamily='KalamRegular'
          large
          backgroundColor='#242424'
          onPress={this.onSignUpButtonPress}
          rounded
        />
      );
    }

    showError = () => {
      if (this.props.error.length >= 13) {
        // this code below in the if section is for the error to animated in and out of the screen
        setTimeout(() => this.setState({ top: -30 }), 1000);
        setTimeout(() => { this.props.resetFields(); this.setState({ top: 15 }); }, 1200);
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
      const { viewContainerStyle, cardContainerStyle, wrapperStyle, labelStyle } = styles;
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
                    onChangeText={(text) => this.props.signupUpdate({ prop: 'email', value: text })}
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
                    onChangeText={(text) => this.props.signupUpdate({ prop: 'password', value: text })}
                    value={this.props.password}
                  />
                  {this.onLoading()}
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
  };

  const mapStateToProps = ({ signUp }) => {
    console.log(signUp);
    const { email, password, loading, error } = signUp;
    return { email, password, loading, error };
  };

export default connect(mapStateToProps, actions)(RegisterNewUserScreen);
