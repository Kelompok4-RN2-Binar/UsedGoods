import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Login,
  Register,
  Splash,
  Home,
  DaftarJual,
  Jual,
  Notifikasi,
  Akun,
  InfoAkun,
} from '../Screens';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../Utils/Colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Notifikasi') {
            iconName = 'bell-outline';
          } else if (route.name === 'Jual') {
            iconName = 'plus-circle-outline';
          } else if (route.name === 'DaftarJual') {
            iconName = 'view-list-outline';
          } else if (route.name === 'Akun') {
            iconName = 'account-outline';
          }
          return <Icon name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: COLORS.white,
        tabBarActiveBackgroundColor: COLORS.white,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: COLORS.dark,
          height: 65,
          borderRadius: 15,
          marginHorizontal: 10,
          bottom: 10,
        },
        tabBarItemStyle: {
          marginHorizontal: 15,
          marginVertical: 10,
          borderRadius: 25,
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Notifikasi" component={Notifikasi} />
      <Tab.Screen name="Jual" component={Jual} />
      <Tab.Screen name="DaftarJual" component={DaftarJual} />
      <Tab.Screen name="Akun" component={Akun} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="MainApp" component={MainApp} />
      <Stack.Screen name="InfoAkun" component={InfoAkun} />
    </Stack.Navigator>
  );
};

export default Router;
