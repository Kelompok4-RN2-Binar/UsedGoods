import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  NativeModules,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {CategoryButton, Header} from '../../Components';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS, FONTS} from '../../Utils';
import {
  getProductSeller,
  DaftarJualScreen,
  getWishlistSeller,
  getSoldSeller,
} from '../../Redux/actions';
import Product from '../../Components/DaftarJual/Product';
import Wishlist from '../../Components/DaftarJual/Wishlist';
import Sold from '../../Components/DaftarJual/Sold';
const DaftarJual = ({navigation}) => {
  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);
  const daftarJualScreen = useSelector(state => state.appData.daftarJualScreen);
  const productDataSeller = useSelector(
    state => state.appData.productDataSeller,
  );
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
      dispatch(getSoldSeller(loginUser.access_token));
      onRefresh();
    }
  }, []);
  const onRefresh = useCallback(() => {
    dispatch(getProductSeller(loginUser.access_token));
    dispatch(getWishlistSeller(loginUser.access_token));
    dispatch(getSoldSeller(loginUser.access_token));
    setRefreshing(true);
    wait(500).then(() => {
      setRefreshing(false);
    });
  }, []);
  return (
    <View style={styles.Container}>
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
            backgroundColor: COLORS.white,
            width: window.width * 0.8,

            flexDirection: 'row',
            paddingVertical: 15,
            justifyContent: 'space-around',
            alignSelf: 'center',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 3,
            marginVertical:10
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                backgroundColor: COLORS.green,
                width: 40,
                height: 40,

                marginRight: 20,

                borderRadius: 8,
              }}
              source={{uri: userData?.image_url}}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <Text style={styles.Name}>{userData?.full_name}</Text>
              <Text style={styles.Location}>{userData?.city}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              borderColor: COLORS.green,
              width: window.width * 0.2,
              justifyContent: 'center',
              alignItems: 'center',

              borderRadius: 8,
              borderWidth: 1,
            }}
            onPress={() => {
              navigation.navigate('EditAccount');
            }}>
            <Text style={styles.Text}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 15,
            marginHorizontal:10
          }}>
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
            onPress={() => dispatch(DaftarJualScreen('Sold'))}
          />
        </View>
        <View
          style={{
            alignSelf: 'center',
            marginBottom:60
          }}>
          {daftarJualScreen == 'Product' && <Product />}
          {daftarJualScreen == 'Wishlist' && <Wishlist />}
          {daftarJualScreen == 'Sold' && <Sold />}
        </View>
      </ScrollView>
    </View>
  );
};

export default DaftarJual;

const {StatusBarManager} = NativeModules;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: StatusBarManager.HEIGHT + 20,
  },
  Name: {
    fontSize: 12,
    fontFamily: FONTS.SemiBold,
    color: COLORS.black,
  },
  Location: {
    fontSize: 10,
    fontFamily: FONTS.Regular,
    color: COLORS.black,
  },
    Text: {
    fontSize: 12,
    fontFamily: FONTS.Regular,
    color: COLORS.black,
  },
});
