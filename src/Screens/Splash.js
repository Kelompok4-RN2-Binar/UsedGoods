import {StyleSheet, Image, SafeAreaView, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS} from '../Utils/Colors';
import {LOGO} from '../Assets/Images';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MainApp');
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Image style={styles.Image} source={LOGO} />
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: 90,
    height: 90,
  },
});
