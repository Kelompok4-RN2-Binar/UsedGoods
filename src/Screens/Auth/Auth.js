import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authScreen} from '../../Redux/actions';
import {Pattern, Logo} from '../../Assets';
import {LoginForm, RegisterForm} from '../../Components';
import {COLORS, FONTS} from '../../Utils/';

const Auth = () => {
  const dispatch = useDispatch();
  const selectScreen = useSelector(state => state.appData.authScreen);

  useEffect(() => {
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
            <TouchableOpacity
              onPress={() => {
                dispatch(authScreen('Login'))
              }}>
              {selectScreen == 'Login' ? (
                <Text style={styles.ActivePage}>Login</Text>
              ) : (
                <Text style={styles.PasivePage}>Login</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(authScreen('Register'));
              }}>
              {selectScreen == 'Register' ? (
                <Text style={styles.ActivePage}>Register</Text>
              ) : (
                <Text style={styles.PasivePage}>Register</Text>
              )}
            </TouchableOpacity>
          </View>
          {selectScreen == 'Login' ? <LoginForm /> : <RegisterForm />}
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
    paddingVertical: 75,
  },
  UsedGoods: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  ImageLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  ImageUsedGoods: {
    fontFamily: FONTS.Regular,
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.white,
  },
  Card: {
    width: window.width * 0.9,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    alignSelf: 'center',
    paddingVertical: 25,
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 25,
  },
  ActivePage: {
    fontFamily: FONTS.Bold,
    fontSize: 18,
    color: COLORS.black,
    borderBottomWidth: 4,
    borderColor: COLORS.red,
  },
  PasivePage: {
    fontFamily: FONTS.Regular,
    color: COLORS.grey,
    fontSize: 14,
  },
});
