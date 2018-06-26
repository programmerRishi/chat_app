import React, { Component } from 'react';
import {
   View,
   Text,
   FlatList,
   Dimensions,
   Image } from 'react-native';
import { connect } from 'react-redux';
import { FormInput, Card, Icon, Tile } from 'react-native-elements';
import * as actions from '../../redux/actions';
import { SelectedPhotoModal } from '../components/SelectedPhotoModal';
import { ChatScreenNavigationOptions } from '../components/navigationOptions';

const { width, height } = Dimensions.get('window');

class ChatWithAdminScreen extends Component {
  static navigationOptions = ChatScreenNavigationOptions;

  componentWillMount() {
    this.props.getMessageHistory();
    this.props.navigation.setParams(
      {
        signOut: this.props.signOut
      }
    );
  }

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }


  keyExtractor = item => item.timeStamp;

  renderMessages = ({ item }) => {
    const { adminMessagesBubbleStyle, userMessagesBubbleStyle, messagesBubbleStyle, imageContainerStyle, imageBubbleStyle } = styles;
    const customMessageBubbleStyle = item.sender === 'user' ? userMessagesBubbleStyle : adminMessagesBubbleStyle;
    if (item.type === 'image') {
      return (
        <View style={imageContainerStyle}>
          <Image
            source={{ uri: item.photo }}
            style={imageBubbleStyle}
          />
        </View>
      );
    }
    return (
        <Card
          containerStyle={[messagesBubbleStyle, customMessageBubbleStyle]}
        >
          <Text >{item.message}</Text>
        </Card>
    );
  }

  render() {
    const {
      showModal,
      uri,
      showImagePicker,
      typingFieldUpdate,
      sendMessage,
      userMessage,
      messagesHistory,
      sendPhoto,
      cancelPhotoSending } = this.props;
    if (showModal) {
      return (
        <SelectedPhotoModal
          onSendIconPress={sendPhoto}
          onBackIconPress={cancelPhotoSending}
          showModal={showModal}
          height={height}
          width={width}
          uri={uri}
        />
      );
    }
    return (
      <View style={styles.container}>
          <View style={styles.messagesContainerStyle}>
            <FlatList
                ref='flatList'
                data={messagesHistory}
                renderItem={this.renderMessages}
                keyExtractor={this.keyExtractor}
                inverted
            />
          </View>
          <View
            style={styles.footerStyle}
          >
              <Icon
                containerStyle={[styles.iconContainerStyle, { left: 10 }]}
                type='font-awesome'
                name='camera'
                onPress={showImagePicker}
              />
              <Card
                containerStyle={styles.typingFieldContainerStyle}
                wrapperStyle={styles.inputWrapperStyle}
              >
                <FormInput
                  containerStyle={{ paddingBottom: 30 }}
                  underlineColorAndroid='#fff'
                  inputStyle={styles.formInputTextStyle}
                  onChangeText={newText => typingFieldUpdate(newText)}
                  value={userMessage}
                />
              </Card>
              <Icon
                containerStyle={[styles.iconContainerStyle, { right: 10 }]}
                type='font-awesome'
                name='paper-plane'
                onPress={() => sendMessage(userMessage)}
              />
          </View>
      </View>
          );
        }
      }
const styles = {
        container: {
          flex: 1,
          backgroundColor: '#DEDEDE',
          borderWidth: 2,
          borderColor: '#000',
          justifyContent: 'space-between'
        },
        footerStyle: {
          flex: 1,
          borderRadius: 40,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'
        },
        inputWrapperStyle: {
          justifyContent: 'center'
        },
        typingFieldContainerStyle: {
          borderRadius: 40,
          bottom: 5,
          height: 50,
          flex: 6
        },
        formInputTextStyle: {
          fontSize: 18
        },
        iconContainerStyle: {
          flex: 1,
          elevation: 2,
          top: 3,
          backgroundColor: '#fff',
          paddingBottom: 5,
          paddingTop: 5,
          borderColor: '#fff',
          borderWidth: 2,
          borderRadius: 80,
        },
        messagesContainerStyle: {
          //maxWidth and alignItems: 'flex-start || flex-end' doesn't not allow alignSelf to work
          flex: 6,
          paddingBottom: 10,
        },
        messageTextStyle: {
          fontSize: 18,
          fontFamily: 'KalamRegular'
        },
        messagesBubbleStyle: {
          borderRadius: 20,
          maxWidth: width - (width * 0.3)
        },
        userMessagesBubbleStyle: {
          borderColor: 'rgba(0,0,0,0.2)',
          alignSelf: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.2)'
        },
        adminMessagesBubbleStyle: {
          borderColor: '#fff',
          alignSelf: 'flex-start',
          backgroundColor: '#fff'
        },
        imageContainerStyle: {
          marginTop: 10,
          marginRight: 10,
          alignSelf: 'flex-end',
          borderWidth: 5,
          borderRadius: 10,
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderColor: 'rgba(0,0,0,0.2)',
        },
        imageBubbleStyle: {
          width: 0.5 * width,
          height: 0.3 * height,
        }
      };
const mapStateToProps = ({ cameraRoll, chat }) => {
  const { uri, showModal } = cameraRoll;
  const { userMessage, messagesHistory } = chat;
  return { uri, showModal, userMessage, messagesHistory };
};

export default connect(mapStateToProps, actions)(ChatWithAdminScreen);
