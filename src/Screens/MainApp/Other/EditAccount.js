import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {RegisterForm, Header} from '../../../Components';
import {COLORS} from '../../../Utils';

const EditAccount = ({navigation}) => {
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      <Header title={'Edit Account'} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.Box}>
        <RegisterForm label={'Edit'} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditAccount;

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