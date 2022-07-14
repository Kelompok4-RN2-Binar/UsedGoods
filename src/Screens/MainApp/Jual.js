import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import { Header,JualForm} from '../../Components';
import {COLORS} from '../../Utils';
import React from 'react';

const Jual = ({navigation}) => {
  
  
  return (
    <SafeAreaView style={styles.Container}> 
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      <Header title={'Sell Product'} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.Box}>
        <JualForm/>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Jual

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  Box: {
    flexGrow: 1,
    paddingBottom: 25,
  },
});