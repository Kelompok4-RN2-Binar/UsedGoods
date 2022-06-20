import {StyleSheet, Image, SafeAreaView, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS} from '../Utils/Colors';
import {LOGO} from '../Assets/Images';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const Splash = () => {
  const isLogin = useSelector(state => state.appData.isLogin)
  console.log(isLogin)
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      if(isLogin==true){
        navigation.replace("MainApp");
      }else if (isLogin!=true){
        navigation.replace("Auth");
      }else{
        navigation.replace("Auth");
      }
    }, 3000);
  }, [navigation]);

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
