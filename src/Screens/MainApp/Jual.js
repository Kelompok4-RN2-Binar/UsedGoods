import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  NativeModules,
} from 'react-native';
import React from 'react';
import {Header, JualForm} from '../../Components';
import {COLORS} from '../../Utils';

const Jual = ({navigation}) => {
  return (
    <View style={styles.Container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      <Header title={'Sell Product'} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.Box}>
        <JualForm />
      </ScrollView>
    </View>
  );
};

export default Jual;

const {StatusBarManager} = NativeModules;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: StatusBarManager.HEIGHT + 20,
  },
  Box: {
    flexGrow: 1,
    paddingBottom: 25,
  },
});
