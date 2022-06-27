import {SafeAreaView, Image, StatusBar, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Logo} from '../../../Assets';
import {COLORS} from '../../../Utils/Colors';
import { useSelector } from 'react-redux';
const Splash = ({navigation}) => {
  const isLogin = useSelector(state => state.appData.isLogin)

  useEffect(() => {
    setTimeout(() => {
       if(isLogin==false){
          navigation.navigate("Auth");
        }else{
          navigation.replace("MainApp")
        };
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Image style={styles.Image} source={Logo} />
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
