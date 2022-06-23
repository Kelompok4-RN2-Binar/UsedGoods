import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Auth, Splash, InfoAkun} from '../Screens';
import MainApp from './MainApp';

const Router = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="MainApp" component={MainApp} />
      <Stack.Screen name="InfoAkun" component={InfoAkun} />
    </Stack.Navigator>
  );
};

export default Router;
