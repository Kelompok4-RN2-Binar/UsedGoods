import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authScreen, connectionChecker} from '../../Redux/actions';
import {Pattern, Logo} from '../../Assets';
import {AuthHeader, LoginForm, RegisterForm} from '../../Components';
import {COLORS, FONTS} from '../../Utils/';
import {ms} from 'react-native-size-matters';

const Auth = () => {
  const dispatch = useDispatch();

  const selectScreen = useSelector(state => state.appData.authScreen);
  const connection = useSelector(state => state.appData.connection);

  useEffect(() => {
    dispatch(connectionChecker);
    dispatch(authScreen('Login'));
  }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={'transparent'} translucent />
      <ImageBackground source={Pattern} style={styles.ImageBackground} />
      <ScrollView contentContainerStyle={styles.Box}>
        <View style={styles.UsedGoods}>
          <Image source={Logo} style={styles.ImageLogo} />
          <Text style={[styles.ImageUsedGoods]}>Used</Text>
          <Text style={[styles.ImageUsedGoods, {color: COLORS.green}]}>
            Goods
          </Text>
        </View>
        <View style={styles.Card}>
          <View style={styles.Header}>
            <AuthHeader screen={'Login'} />
            <AuthHeader screen={'Register'} />
          </View>
          {selectScreen == 'Login' ? (
            <LoginForm connection={connection} />
          ) : (
            <RegisterForm connection={connection} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Auth;

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  ImageBackground: {
    position: 'absolute',
    width: window.width * 1,
    height: window.height * 1,
  },
  Box: {
    flexGrow: 1,
    justifyContent: 'center',

    paddingVertical: ms(75),
  },
  UsedGoods: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: ms(50),
  },
  ImageLogo: {
    width: ms(40),
    height: ms(40),
    marginRight: ms(10),
  },
  ImageUsedGoods: {
    fontFamily: FONTS.Regular,
    fontSize: ms(30),
    fontWeight: '700',
    color: COLORS.white,
  },
  Card: {
    backgroundColor: COLORS.white,

    width: window.width * 0.9,
    alignSelf: 'center',
    borderRadius: ms(15),

    paddingVertical: ms(25),
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',

    marginBottom: ms(25),
  },
});
