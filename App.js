import React from 'react';
import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducers';
import Router from './src/components/Router';
import firebaseConfig from './firebaseConfig';

console.disableYellowBox = true;

class App extends React.Component {
  state = { isReady: false };

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
  }

  async LoadFont() {
    try {
      return (
        await Font.loadAsync(
          {
             KalamRegular: require('./assets/fonts/Kalam-Regular.ttf')
          }
        )
      );
    } catch (e) {
      console.log(e);
    }
  }
   render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    if (!this.state.isReady) {
      return (
        <AppLoading
        startAsync={this.LoadFont}
        onFinish={() => this.setState({ isReady: true })}
        onError={console.warn}
        />
      );
    }
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
