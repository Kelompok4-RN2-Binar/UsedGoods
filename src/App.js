import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './Router';
import {Provider} from 'react-redux';
import Store, {PersistStor} from './Redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={PersistStor}>
        <NavigationContainer>
          <Router />
          <Toast />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
