import React, { Component } from 'react';
import {
   View,
   Text,
   FlatList,
   Dimensions,
   Image,
   Keyboard,
   TouchableOpacity,
   Alert,
   ActivityIndicator,
   LayoutAnimation,
   ProgressBarAndroid } from 'react-native';
import { connect } from 'react-redux';
import { FormInput, Card, Icon } from 'react-native-elements';
import * as actions from '../../redux/actions';
import { SelectedPhotoModal, ChatScreenNavigationOptions, Styles } from '../components';

const { width, height } = Dimensions.get('window');

class ChatWithAdminScreen extends Component {
  static navigationOptions = ChatScreenNavigationOptions;

  state = { addPaddingBottom: 0 };

  componentWillMount() {
    Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    this.props.navigation.setParams(
      {
        signOut: this.props.signOut
      }
    );
  }

  shouldComponentUpdate(nextProps) {
    const { oldMessagesHistory, deletedMessagesHistory, getFinalMessageHistory } = nextProps;
    if (this.props !== nextProps) {
      const shouldCallGetFinalMessages = (oldMessagesHistory === null && deletedMessagesHistory === null) || (typeof oldMessagesHistory === 'object' && typeof deletedMessagesHistory === 'object');
      if (shouldCallGetFinalMessages) {
        getFinalMessageHistory({ oldMessagesHistory, deletedMessagesHistory });
      }
      LayoutAnimation.configureNext(
        {
          duration: 150,
          create: { type: 'linear', property: 'opacity' },
          update: { type: 'linear' }
        }
      );
      return true;
    }
    return false;
  }

  onLongPress = (item) => {
    const { deletePhoto, deleteMessage } = this.props;
    Alert.alert(
      '',
      `Do you want to delete this ${item.type}`,
      [
        { text: 'OK',
          onPress: () => item.type === 'image' ? deletePhoto(item) : deleteMessage(item)
        },
        { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
      ],
      { cancelable: true }
    );
  }
  //
  keyboardDidShow = (e) => {
    console.log('keyboardDidShow', e.endCoordinates);
    this.props.onKeyboardShow((e.endCoordinates.height));
  }

  keyboardDidHide = () => {
    console.log('keyboardDidHide');
    this.props.onKeyBoardHide();
  }

  keyExtractor = item => item.timeStamp;

  whileFetchingData = (messagesHistory) => {
    if (messagesHistory === null) {
      return (
        <ActivityIndicator
          size={50}
          color='#000'
        />
      );
    }
    return (
      <FlatList
          ref='flatList'
          data={this.props.messagesHistory}
          extraData={this.props}
          renderItem={this.renderMessages}
          keyExtractor={this.keyExtractor}
          inverted
      />
    );
  }

  showProgressBar = (item) => {
    const { progress, uploadingImageUri } = this.props;
    const showProgressBar = item.photo === uploadingImageUri && progress === 0;
    return (
      <ProgressBarAndroid
        animating={showProgressBar}
        indeterminate
        styleAttr='Horizontal'
        color='#000'
      />
    );
  }
    renderMessages = ({ item }) => {
      const { adminMessagesBubbleStyle, userMessagesBubbleStyle, messagesBubbleStyle, imageContainerStyle, imageBubbleStyle } = Styles;
      const customMessageBubbleStyle = item.sender === 'user' ? userMessagesBubbleStyle : adminMessagesBubbleStyle;
      if (item.type === 'image') {
        return (
          <TouchableOpacity
            onLongPress={() => this.onLongPress(item)}
            delayLongPress={500}
          >
            <View style={imageContainerStyle}>
              <Image
                source={{ uri: item.photo }}
                style={imageBubbleStyle}
              />
              {this.showProgressBar(item)}
            </View>
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity
          onLongPress={() => this.onLongPress(item)}
          delayLongPress={500}
        >
          <Card
            containerStyle={[messagesBubbleStyle, customMessageBubbleStyle]}
          >
            <Text >{item.message}</Text>
          </Card>
        </TouchableOpacity>
      );
    }

  render() {
    console.log(this.state);
    const {
      addPaddingBottom,
      showModal,
      uri,
      showImagePicker,
      typingFieldUpdate,
      sendMessage,
      messagesHistory,
      userMessage,
      sendPhotoUri,
      uploadPhoto,
      base64,
      cancelPhotoSending } = this.props;
    const {
      container,
      messagesContainerStyle,
      footerStyle,
      iconContainerStyle,
      typingFieldContainerStyle,
      inputWrapperStyle,
      formInputTextStyle } = Styles;
    if (showModal) {
      return (
        <SelectedPhotoModal
          sendPhotoUri={sendPhotoUri}
          uploadPhoto={uploadPhoto}
          onBackIconPress={cancelPhotoSending}
          showModal={showModal}
          height={height}
          width={width}
          uri={uri}
          base64={base64}
        />
      );
    }
    return (
      <View style={[container, { paddingBottom: addPaddingBottom }]}>
          <View style={messagesContainerStyle}>
            {this.whileFetchingData(messagesHistory)}
          </View>
          <View
            style={footerStyle}
          >
              <Icon
                containerStyle={[iconContainerStyle, { left: 10 }]}
                type='font-awesome'
                name='camera'
                onPress={showImagePicker}
              />
              <Card
                containerStyle={typingFieldContainerStyle}
                wrapperStyle={inputWrapperStyle}
              >
                <FormInput
                  containerStyle={{ paddingBottom: 30 }}
                  underlineColorAndroid='#fff'
                  inputStyle={formInputTextStyle}
                  onChangeText={newText => typingFieldUpdate(newText)}
                  value={userMessage}
                />
              </Card>
              <Icon
                containerStyle={[iconContainerStyle, { right: 10 }]}
                type='font-awesome'
                name='paper-plane'
                onPress={() => sendMessage(userMessage)}
              />
          </View>
      </View>
    );
  }
}

const mapStateToProps = ({ cameraRoll, chat, keyboardAvoid }) => {
  const { uri, base64, showModal, progress, uploadingImageUri } = cameraRoll;
  const { userMessage, messagesHistory, oldMessagesHistory, deletedMessagesHistory, showActivityIndicator } = chat;
  const { addPaddingBottom } = keyboardAvoid;
  return { uri, base64, showModal, progress, uploadingImageUri, userMessage, oldMessagesHistory, messagesHistory, deletedMessagesHistory, showActivityIndicator, addPaddingBottom };
};

export default connect(mapStateToProps, actions)(ChatWithAdminScreen);
