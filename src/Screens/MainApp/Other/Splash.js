import {
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {Logo} from '../../../Assets';
import {COLORS} from '../../../Utils/Colors';
import {useSelector} from 'react-redux';
const Splash = ({navigation}) => {
  const loginUser = useSelector(state => state.appData.loginUser);

  useEffect(() => {
    setTimeout(() => {
      if (loginUser) {
        navigation.replace('MainApp');
      } else {
        navigation.navigate('Auth');
      }
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Image style={styles.Image} source={Logo} />
    </SafeAreaView>
  );
};

export default Splash;

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: window.height * 0.1,
    height: window.height * 0.1,
  },
});
