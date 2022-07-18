import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  NativeModules,
} from 'react-native';
import React from 'react';
import {Header} from '../../../Components';
import EditForm from '../../../Components/MainAppForm/EditForm';
import {COLORS} from '../../../Utils';

const EditProduct = ({route, navigation}) => {
  const {data} = route.params;

  return (
    <View style={styles.Container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      <Header title={'Edit Product'} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.Box}>
        <EditForm data={data} />
      </ScrollView>
    </View>
  );
};

export default EditProduct;

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
