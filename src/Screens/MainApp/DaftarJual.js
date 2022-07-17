import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {CategoryButton, Header} from '../../Components';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS, FONTS} from '../../Utils';
import {getProductSeller, DaftarJualScreen,getWishlistSeller} from '../../Redux/actions';
import Product from '../../Components/DaftarJual/Product';
import Wishlist from '../../Components/DaftarJual/Wishlist';
const DaftarJual = ({navigation}) => {
  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);
  const daftarJualScreen = useSelector(state => state.appData.daftarJualScreen);
  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  useEffect(() => {
    if (loginUser == null && userData == null) {
      navigation.navigate('Akun');
    } else {
      dispatch(getProductSeller(loginUser.access_token));
      dispatch(getWishlistSeller(loginUser.access_token));
      onRefresh();
    }
  }, []);
  const onRefresh = useCallback(() => {
    dispatch(getProductSeller(loginUser.access_token));
    dispatch(getWishlistSeller(loginUser.access_token));
    setRefreshing(true);
    wait(300).then(() => {
      setRefreshing(false);
    });
  }, []);
  return (
    <SafeAreaView style={styles.Container}>
      {loginUser == null && userData == null ? (
        <></>
      ) : (
        <>
          <StatusBar
            backgroundColor="transparent"
            barStyle="dark-content"
            translucent
          />
          <Header title={'My Selling List'} />
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="green"
                colors={['green']}
              />
            }>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 15,
                width: window.width * 0.8,
                alignSelf: 'center',
              }}>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: window.width * 0.8,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      marginRight: 20,
                      backgroundColor: 'black',
                    }}
                    source={{uri: userData.image_url}}
                  />
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.Text}>{userData.full_name}</Text>
                    <Text style={styles.Text}>{userData.city}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: COLORS.green,
                    width: window.width * 0.2,
                  }}
                  onPress={() => {
                    navigation.navigate('EditAccount');
                  }}>
                  <Text style={styles.Text}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <CategoryButton
                name={'Product'}
                icon={'package-variant-closed'}
                onPress={() => dispatch(DaftarJualScreen('Product'))}
              />
              <CategoryButton
                name={'Interested'}
                icon={'heart-outline'}
                onPress={() => dispatch(DaftarJualScreen('Wishlist'))}
              />
              <CategoryButton
                name={'Sold'}
                icon={'currency-usd'}
                onPress={() => dispatch(DaftarJualScreen())}
              />
            </View>
            <View
              style={{
                marginHorizontal: 5,
                marginVertical: 5,
                alignSelf: 'center',
              }}>
              {daftarJualScreen == 'Product' && <Product />}
              {daftarJualScreen == 'Wishlist' && <Wishlist />}
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default DaftarJual;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  Text: {
    fontSize: 12,
    fontFamily: FONTS.SemiBold,
    color: COLORS.black,
  },
});
