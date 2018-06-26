import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import ChatWithAdminScreen from '../screens/ChatWithAdminScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterNewUserScreen from '../screens/RegisterNewUserScreen';

const StackRouterAuth = createStackNavigator(
  {
    logIn: {
      screen: LoginScreen,
    },
    register: {
      screen: RegisterNewUserScreen,
    },
  }
);

const StackRouterChat = createStackNavigator(
  {
    chatStack: {
      screen: ChatWithAdminScreen
    }
  }
);

const Router = createSwitchNavigator(
  {
    auth: {
      screen: StackRouterAuth
    },
    chat: {
      screen: StackRouterChat,
    }
  },
  {
    initialRouteName: 'auth'
  }
);

export default Router;
