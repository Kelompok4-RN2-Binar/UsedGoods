import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ms} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {Home, DaftarJual, Jual, Notifikasi, Akun} from '../Screens';
import {COLORS} from '../Utils/Colors';

const Tab = createBottomTabNavigator();

const MainApp = () => {
  const loginUser = useSelector(state => state.appData.loginUser);

  const bottom = Platform.OS === 'ios' ? ms(20) : ms(5);

  const handleNotLogin = ({navigation}) => ({
    tabPress: e => {
      if (!loginUser) {
        e.preventDefault();
        navigation.navigate('Auth');
      }
    },
  });

  return (
    <Tab.Navigator
      initialRouteName="Home"
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
          return <Icon name={iconName} size={ms(22)} color={color} />;
        },
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: COLORS.white,
        tabBarActiveBackgroundColor: COLORS.white,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: COLORS.dark,
          height: ms(50),
          borderRadius: ms(10),
          marginHorizontal: ms(5),
          paddingHorizontal: ms(20),
          bottom: bottom,
        },
        tabBarItemStyle: {
          height: ms(40),
          marginHorizontal: ms(10),
          marginVertical: ms(5),
          borderRadius: ms(10),
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Notifikasi"
        component={Notifikasi}
        listeners={handleNotLogin}
      />
      <Tab.Screen
        name="Jual"
        component={Jual}
        options={{
          tabBarStyle: {display: 'none'},
        }}
        listeners={handleNotLogin}
      />
      <Tab.Screen
        name="DaftarJual"
        component={DaftarJual}
        listeners={handleNotLogin}
      />
      <Tab.Screen name="Akun" component={Akun} />
    </Tab.Navigator>
  );
};

export default MainApp;
