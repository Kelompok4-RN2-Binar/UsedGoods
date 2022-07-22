import {View, Image, StatusBar, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {ms} from 'react-native-size-matters';
import {Logo} from '../../../Assets';
import {COLORS} from '../../../Utils/Colors';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainApp');
    }, 2000);
  }, []);

  return (
    <View style={styles.Container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <Image style={styles.Image} source={Logo} />
    </View>
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
    width: ms(80),
    height: ms(80),
  },
});
