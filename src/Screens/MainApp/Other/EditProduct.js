import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import { Header } from '../../../Components';
import { COLORS } from '../../../Utils';
import React from 'react';
import EditForm from '../../../Components/MainAppForm/EditForm';
import { useNavigation } from '@react-navigation/native';

const EditProduct = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params;
  return (
    <SafeAreaView style={styles.Container}> 
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      <Header title={'Edit Product'} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.Box}>
        <EditForm data={data}/>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditProduct

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