import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import Router from './Router';
import Store, {PersistStore} from './Redux/Store';
import CodePush from 'react-native-code-push';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};
const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={PersistStore}>
        <NavigationContainer>
          <Router />
          <Toast />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default CodePush(codePushOptions)(App);
