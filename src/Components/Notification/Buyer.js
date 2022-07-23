import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  RefreshControl,
  ScrollView,
  Linking,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {rupiah, timeDate} from '../../Redux/actions';
import {COLORS, FONTS} from '../../Utils';
import {
  getNotificationBuyer,
  getDetailNotification,
  readNotif,
} from '../../Redux/actions';
import {useDispatch} from 'react-redux';
import BottomModal from '../Others/BottomModal';
import Button from '../Others/Button';
import Toast from 'react-native-toast-message';
const Buyer = () => {
  const dispatch = useDispatch();
  const notifDataBuyer = useSelector(state => state.appData.notifDataBuyer);
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);
  const [refreshing, setRefreshing] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [component, setComponent] = useState(null);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    dispatch(getNotificationBuyer(loginUser.access_token)).then(() => {
      setRefreshing(true);
    });
    wait(500).then(() => {
      setRefreshing(false);
    });
  }, []);
  const loadData = useCallback(() => {
    dispatch(getNotificationBuyer(loginUser.access_token));
  }, []);

  const onDismiss = () => {
    setopenModal(false);
  };
  var dataDetail = useSelector(state => state.appData.notifDataDetail);

  const sendOnWhatsApp = () => {
    let url =
      'whatsapp://send?text=' +
      'Hello this is ' +
      userData.full_name +
      ' who want to buy  ' +
      dataDetail.product_name +
      ' in SecondApp with bid price ' +
      'Rp. ' +
      rupiah(dataDetail.bid_price) +
      '&phone=62' +
      dataDetail.User.phone_number;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Make sure Whatsapp installed on your device',
        });
      });
  };

  const onOpenAccepted = (id, read) => {
    if (dataDetail.id == id) {
      setopenModal(true);
      loadData();
      if (read == false) {
        dispatch(readNotif(loginUser.access_token, dataDetail.id)).then(() => {
          setRefreshing(true);
        });
        wait(500).then(() => {
          setRefreshing(false);
        });
      }

      setComponent(
        <View style={{width: window.width}}>
          {dataDetail.id == id && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: window.width * 0.9,
                alignSelf: 'center',
              }}>
              {dataDetail.status == 'accepted' && (
                <>
                  <Text
                    style={[
                      styles.Text,
                      {
                        alignSelf: 'center',
                        fontSize: 14,
                        paddingTop: 10,
                        fontFamily: FONTS.SemiBold,
                        color: COLORS.green,
                      },
                    ]}>
                    Yeay you managed to get a suitable price :)
                  </Text>
                  <Text
                    style={[
                      styles.textGrey,
                      {alignSelf: 'center', fontSize: 14},
                    ]}>
                    Immediately contact the seller via whatsapp for further
                    transactions
                  </Text>
                  <Text
                    style={[
                      styles.Text,
                      {
                        alignSelf: 'center',
                        fontSize: 16,
                        paddingTop: 10,
                        fontFamily: FONTS.SemiBold,
                      },
                    ]}>
                    Product Bid
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 20,
                      width: window.width * 0.9,
                      marginLeft: 20,
                    }}>
                    <Image style={styles.imageUser} />
                    <View style={{flexDirection: 'column'}}>
                      <Text style={[styles.Text, {fontSize: 18}]}>
                        {dataDetail.seller_name}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 20,
                      width: window.width * 0.9,
                      marginLeft: 20,
                    }}>
                    <Image
                      style={styles.imageUser}
                      source={{uri: dataDetail.Product.image_url}}
                    />
                    <View style={{flexDirection: 'column'}}>
                      <Text style={[styles.Text, {fontSize: 14}]}>
                        {dataDetail.Product.name}
                      </Text>
                      <Text
                        style={[styles.Text, {fontSize: 14}]}>{`Rp. ${rupiah(
                        dataDetail.Product.base_price,
                      )}`}</Text>
                      <Text style={[styles.Text, {fontSize: 14}]}>
                        Bid {`Rp. ${rupiah(dataDetail.bid_price)}`}
                      </Text>
                    </View>
                  </View>
                  <Button
                    caption={'Contact Seller via Whatsapp'}
                    onPress={() => {
                      sendOnWhatsApp();
                    }}
                    style={{
                      width: window.width * 0.8,
                      height: 50,
                      marginVertical: 15,
                    }}
                  />
                </>
              )}
              {dataDetail.status == 'declined' && (
                <>
                  <Text
                    style={[
                      styles.Text,
                      {
                        alignSelf: 'center',
                        fontSize: 14,
                        paddingTop: 10,
                        fontFamily: FONTS.SemiBold,
                        color: COLORS.red,
                      },
                    ]}>
                    Mehh your order got declined by seller :({' '}
                  </Text>
                  <Text
                    style={[
                      styles.textGrey,
                      {alignSelf: 'center', fontSize: 14},
                    ]}>
                    Hope you get best price in other product!
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: 20,
                      width: window.width * 0.9,
                      marginLeft: 20,
                    }}>
                    <Image
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 10,
                        marginRight: 20,
                      }}
                      source={{uri: dataDetail.image_url}}
                    />
                    <View style={{flexDirection: 'column', marginBottom: 10}}>
                      <Text
                        style={[
                          styles.Text,
                          {fontSize: 16, fontFamily: FONTS.SemiBold},
                        ]}>
                        {dataDetail.product_name}
                      </Text>
                      <Text
                        style={[styles.Text, {fontSize: 14}]}>{`Rp. ${rupiah(
                        dataDetail.base_price,
                      )}`}</Text>
                      <Text style={[styles.textGrey]}>{`${timeDate(
                        dataDetail.updatedAt,
                      )}`}</Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          )}
        </View>,
      );
    }
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.Box}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="green"
            colors={['green']}
          />
        }>
        {notifDataBuyer &&
          notifDataBuyer.map(item => {
            return (
              <TouchableOpacity
                style={{flexDirection: 'row', marginTop: 20}}
                key={item.id}
                onPress={() => {
                  dispatch(
                    getDetailNotification(loginUser.access_token, item.id),
                  ).then(() => {
                    onOpenAccepted(item.id, item.read);
                  });
                }}>
                <Image source={{uri: item.image_url}} style={styles.image} />
                <View style={{flexDirection: 'column', marginLeft: 15}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingRight: 30,
                    }}>
                    {item.status == 'accepted' ? (
                      <Text style={styles.textGrey}>Product Offer</Text>
                    ) : (
                      <Text style={[styles.textGrey, {color: COLORS.red}]}>
                        Offer Declined
                      </Text>
                    )}
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[styles.textGrey]}>{`${timeDate(
                        item.updatedAt,
                      )}`}</Text>
                      {item.read == false && <View style={styles.dot} />}
                    </View>
                  </View>
                  <Text style={styles.textBlack}>{item.product_name}</Text>
                  <Text style={styles.textBlack}>{`Rp. ${rupiah(
                    item.base_price,
                  )}`}</Text>
                  {item.bid_price != null && item.status == 'accepted' ? (
                    <Text style={styles.textBlack}>
                      Successfully Bid {`Rp. ${rupiah(item.bid_price)}`}
                    </Text>
                  ) : (
                    <Text style={styles.textBlack}>
                      Bid {`Rp. ${rupiah(item.bid_price)}`}
                    </Text>
                  )}
                  {item.status == 'accepted' && (
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        width: window.width * 0.8,
                      }}>
                      <Text style={[styles.textGrey, {fontSize: 14}]}>
                        you will be contacted by the seller via whatsapp
                      </Text>
                    </View>
                  )}

                  <View
                    style={{
                      flexWrap: 'wrap',
                      width: window.width * 0.82,
                      flexDirection: 'row',
                    }}>
                    {/* <Text style={[styles.textGrey]}>
                        Kamu akan segera dihubungi penjual via whatsapp
                    </Text> */}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        {openModal && (
          <BottomModal onDismiss={onDismiss}>{component}</BottomModal>
        )}
      </ScrollView>
    </View>
  );
};

export default Buyer;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width * 1,
    backgroundColor: COLORS.white,
    paddingBottom: 80,
  },
  textBold: {
    color: COLORS.black,
    fontFamily: FONTS.Bold,
    fontSize: 24,
  },
  text: {
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    fontSize: 22,
  },
  textGrey: {
    color: COLORS.grey,
    fontFamily: FONTS.Regular,
    fontSize: 12,
    paddingBottom: 4,
  },
  textBlack: {
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    fontSize: 14,
    paddingBottom: 4,
  },
  image: {
    width: 40,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 12,
  },
  dot: {
    backgroundColor: '#FA2C5A',
    width: 8,
    height: 8,
    borderRadius: 10,
    marginTop: 4,
    marginLeft: 8,
  },
  Box: {
    width: window.width * 0.9,
  },

  imageUser: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 20,
    backgroundColor: 'black',
  },
  Text: {
    fontSize: 12,
    fontFamily: FONTS.Regular,
    color: COLORS.black,
  },
});
