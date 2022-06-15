import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MainApp');
    }, 3000);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar translucent backgroundColor="transparent" />
      <Text style={{color: 'black', fontSize: 30}}>SPLASH</Text>
    </SafeAreaView>
  );
};

export default Splash;
const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: screen.width * 1.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
