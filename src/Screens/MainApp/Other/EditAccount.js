import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  NativeModules,
} from 'react-native';
import React from 'react';
import {RegisterForm, Header} from '../../../Components';
import {COLORS} from '../../../Utils';

const EditAccount = ({navigation}) => {
  return (
    <View style={styles.Container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      <Header title={'Edit Account'} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.Box}>
        <RegisterForm label={'Edit'} />
      </ScrollView>
    </View>
  );
};

export default EditAccount;

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
