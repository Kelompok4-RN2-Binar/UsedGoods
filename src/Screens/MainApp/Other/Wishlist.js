import {
  View,
  StatusBar,
  NativeModules,
  Platform,
  Dimensions,
  StyleSheet,
  FlatList,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSpesificProductBuyer,
  getStatusOrderProduct,
  getWishlist,
  removeWishlist,
  getStatusOrder
} from '../../../Redux/actions';
import {COLORS} from '../../../Utils';
import {ms} from 'react-native-size-matters';
import {Header, ProductCard} from '../../../Components';
import { GET_STATUS_ORDER_PRODUCT } from '../../../Redux/types';

const Wishlist = ({navigation}) => {
  const dispatch = useDispatch();

  const loginUser = useSelector(state => state.appData.loginUser);
  const statusOrder = useSelector(state => state.appData.statusOrder);
  const wishlist = useSelector(state => state.appData.wishlist);

  const wishlistFilter = wishlist?.map(i => i.Product);
  console.log('tesssssssss', wishlistFilter);

  const getData = () => {
    dispatch(getWishlist(loginUser.access_token));
    dispatch(getStatusOrder(loginUser.access_token))
  
  };

  useState(() => {
    getData();
  }, []);

  const renderItem = ({item}) => (
    <ProductCard
      onPress={() => {
        if (loginUser) {
          dispatch({
            type: GET_STATUS_ORDER_PRODUCT,
            statusOrderProduct: null,
          });  
          dispatch(
            getSpesificProductBuyer(loginUser.access_token, item.product_id),
          ).then(() => {
            if (statusOrder != null) {
              var order = statusOrder.filter(itemS => {
                return itemS.product_id == item.product_id;
              });
              var orderArray = order.map(o => {
                return o.id;
              });
              const orderId = orderArray.toString();
              if (orderId == '') {
                navigation.navigate('Detail', {
                  user: 'buyer',
                  order_id: null,
                });
              } else {
                dispatch(
                  getStatusOrderProduct(loginUser.access_token, orderId),
                ).then(
                  navigation.navigate('Detail', {
                    user: 'buyer',
                    order_id: orderId,
                  }),
                );
              }
            }
          });
        } else {
          navigation.navigate('Auth');
        }
      }}
      data={item}
      label={'wishlist'}
      onPressWishlist={() =>
        dispatch(removeWishlist(loginUser.access_token, item.id)).then(() =>
          getData(),
        )
      }
    />
  );

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <Header navigation={navigation} title={'Wishlist'} />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        numColumns={2}
        data={wishlist}
        renderItem={renderItem}
        contentContainerStyle={styles.FlatlistContainer}
      />
    </View>
  );
};

export default Wishlist;

const {StatusBarManager} = NativeModules;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: StatusBarManager.HEIGHT + ms(20),
    paddingBottom: Platform.OS === 'ios' ? ms(75) : ms(60),
  },
  FlatlistContainer: {
    alignItems: 'center',
  },
});
