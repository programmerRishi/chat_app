import React, { Component } from 'react';
import {
   View,
   Text,
   FlatList,
   Dimensions,
   Image,
   TouchableOpacity,
   Alert,
   ActivityIndicator,
   ProgressBarAndroid } from 'react-native';
import { connect } from 'react-redux';
import { FormInput, Card, Icon } from 'react-native-elements';
import * as actions from '../../redux/actions';
import { SelectedPhotoModal, ChatScreenNavigationOptions, Styles } from '../components';

const { width, height } = Dimensions.get('window');

class ChatWithAdminScreen extends Component {
  static navigationOptions = ChatScreenNavigationOptions;

  componentWillMount() {
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
          onPress: () => {
            if (item.type === 'image') {
              deletePhoto(item);
              return;
            }
            deleteMessage(item);
          }
        },
        { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
      ],
      { cancelable: true }
    );
  }

  keyExtractor = item => item.timeStamp;

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

  render() {
    const {
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
      <View style={container}>
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

const mapStateToProps = ({ cameraRoll, chat }) => {
  const { uri, base64, showModal } = cameraRoll;
  const { userMessage, messagesHistory, oldMessagesHistory, deletedMessagesHistory, showActivityIndicator } = chat;
  return { uri, base64, showModal, userMessage, oldMessagesHistory, messagesHistory, deletedMessagesHistory, showActivityIndicator };
};

export default connect(mapStateToProps, actions)(ChatWithAdminScreen);
