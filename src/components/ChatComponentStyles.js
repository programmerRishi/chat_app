import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Styles = {
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
