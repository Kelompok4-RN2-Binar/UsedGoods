import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  ImageBackground,
  Dimensions,
  RefreshControl,
  NativeModules,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {COLORS, FONTS} from '../../../Utils';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  buyProduct,
  connectionChecker,
  deleteProduct,
  getStatusOrderProduct,
  goFingerprint,
  rupiah,
} from '../../../Redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../Components/Others/Button';
import BottomModal from '../../../Components/Others/BottomModal';
import {ButtonIcon, DetailProductShimmer, Input} from '../../../Components';
import {Formik} from 'formik';
import * as yup from 'yup';
import {ms} from 'react-native-size-matters';
const Detail = ({route}) => {
  const {user, order_id} = route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const connection = useSelector(state => state.appData.connection);
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);

  const productSpesific =
    user == 'seller'
      ? useSelector(state => state.appData.productSpesific)
      : useSelector(state => state.appData.productSpesificBuyer);

  const statusOrderProduct =
    user != 'seller' && useSelector(state => state.appData.statusOrderProduct);

  const [openModal, setopenModal] = useState(false);
  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const goDelete = () => {
    dispatch(deleteProduct(loginUser.access_token, productSpesific.id)).then(
      navigation.navigate('DaftarJual'),
    );
  };

  const goBuy = (values, resetForm) => {
    goFingerprint().then(() => {
      dispatch(buyProduct(values, loginUser.access_token)).then(() => {
        setRefreshing(true);
        wait(500).then(() => {
          resetForm();
          setopenModal(false);
          setRefreshing(false);
          navigation.replace('MainApp');
        });
        // dispatch(getStatusOrderProduct(loginUser.access_token, order.id))
      });
    });
  };
  const buyValidation = yup.object().shape({
    base_price: yup.string().required('Price is Required!'),
  });

  const onOpen = () => {
    setopenModal(true);
    setComponent(
      <View style={{width: window.width}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: window.width * 0.9,
            alignSelf: 'center',
            paddingBottom: ms(60),
            paddingTop: ms(20),
          }}>
          <Text
            style={[
              styles.Text,
              {
                fontSize: ms(16),
                fontFamily: FONTS.SemiBold,
              },
            ]}>
            Enter your bid price
          </Text>
          <Text
            style={[
              styles.textGrey,
              {textAlign: 'center', fontSize: ms(12), paddingTop: ms(10)},
            ]}>
            Your bid price will be known by the seller, if the seller matches
            you will be contacted by the seller immediately
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: ms(15),
              width: window.width * 0.8,
            }}>
            <Image
              style={styles.imageUser}
              source={{uri: productSpesific.image_url}}
            />
            <View style={{flexDirection: 'column'}}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: window.width * 0.7,
                }}>
                <Text style={[styles.Text, {fontSize: ms(14)}]}>
                  {productSpesific.name}
                </Text>
              </View>
              <Text
                style={[
                  styles.Text,
                  {fontSize: ms(14), fontFamily: FONTS.Regular},
                ]}>{`Rp. ${rupiah(productSpesific.base_price)}`}</Text>
            </View>
          </View>
          <Formik
            initialValues={{
              base_price: '',
              id: productSpesific.id,
            }}
            validationSchema={buyValidation}
            onSubmit={(values, {resetForm}) => {
              goBuy(values, resetForm);
            }}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <View
                style={{
                  flexDirection: 'column',
                  width: window.width * 0.8,
                  marginTop: ms(20),
                }}>
                <Text
                  style={[
                    styles.Text,
                    {
                      fontSize: ms(14),
                      fontFamily: FONTS.Regular,
                      paddingBottom: ms(5),
                    },
                  ]}>
                  Bid Price
                </Text>
                <Input
                  onChangeText={handleChange('base_price')}
                  onBlur={handleBlur('base_price')}
                  value={values.base_price}
                  placeholder={'Rp 0.00'}
                  error={errors.base_price}
                  screen={'jual'}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Button
                    caption={'Buy'}
                    onPress={handleSubmit}
                    style={{
                      width: window.width * 0.8,
                      height: ms(50),
                    }}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>,
    );
  };

  const cekData = () => {
    if (user == 'buyer') {
      if (statusOrderProduct) {
        dispatch(
          getStatusOrderProduct(loginUser.access_token, statusOrderProduct.id),
        );
      }
      if (order_id) {
        dispatch(getStatusOrderProduct(loginUser.access_token, order_id));
      } else {
        dispatch(getStatusOrderProduct(loginUser.access_token, null));
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(connectionChecker());
      cekData();
    }
  }, [connection]);

  const onRefresh = useCallback(() => {
    setLoading(true);
    cekData();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.Container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'light-content'}
      />
      {loading || !connection ? (
        <DetailProductShimmer />
      ) : (
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
          <ImageBackground
            style={styles.Image}
            source={{uri: productSpesific?.image_url}}>
            <TouchableOpacity style={styles.Header}>
              <ButtonIcon
                icon="keyboard-backspace"
                onPress={() => navigation.goBack()}
                color={COLORS.white}
              />
            </TouchableOpacity>
            <View style={styles.Card}>
              <Text style={styles.Name}>{productSpesific?.name}</Text>
              <View style={styles.CategoryContainer}>
                {productSpesific?.Categories.map(item => {
                  return (
                    <Text key={item.id} style={styles.Category}>
                      | {item.name} |
                    </Text>
                  );
                })}
              </View>
              <Text style={styles.Price}>
                {`Rp. ${rupiah(productSpesific?.base_price)}`}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.Seller}>
            <Image
              style={styles.ProfileImage}
              source={
                user == 'seller'
                  ? {uri: userData?.image_url}
                  : {uri: productSpesific?.User.image_url}
              }
            />
            <View style={styles.SellerText}>
              <Text style={styles.SellerName}>
                {user == 'seller'
                  ? userData?.full_name
                  : productSpesific?.User.full_name}
              </Text>
              <Text style={styles.SellerLocation}>
                {user == 'seller' ? userData?.city : productSpesific?.User.city}
              </Text>
            </View>
          </View>
          <View style={styles.Description}>
            <Text style={styles.SubTitle}>Description</Text>
            <Text style={styles.DescriptionText}>
              {productSpesific?.description}
            </Text>
          </View>
          <View style={styles.Button}>
            {user == 'seller' && (
              <>
                <Button
                  caption={'Edit'}
                  style={{backgroundColor: COLORS.green}}
                  onPress={() => {
                    navigation.navigate('EditProduct', {
                      data: productSpesific,
                    });
                  }}
                />
                <Button
                  caption={'Delete'}
                  style={{backgroundColor: COLORS.red}}
                  onPress={() => {
                    goDelete();
                  }}
                />
              </>
            )}
            {user == 'buyer' && (
              <>
                {statusOrderProduct != null ? (
                  <>
                    {statusOrderProduct.status == 'pending' && (
                      <Button
                        caption={'Waiting for seller response'}
                        style={{
                          width: window.width * 0.9,
                          backgroundColor: COLORS.disabled,
                        }}
                        onPress={() => {
                          onOpen();
                        }}
                        disabled={true}
                      />
                    )}
                    {statusOrderProduct.status == 'accepted' && (
                      <Button
                        caption={'You already buy this product'}
                        style={{
                          width: window.width * 0.9,
                          backgroundColor: COLORS.disabled,
                        }}
                        disabled={true}
                      />
                    )}
                    {statusOrderProduct.status == 'declined' && (
                      <Button
                        caption={'Your bid in this product got declined'}
                        style={{
                          width: window.width * 0.9,
                          backgroundColor: COLORS.red,
                        }}
                        onPress={() => {
                          onOpen();
                        }}
                      />
                    )}
                  </>
                ) : (
                  <Button
                    caption={'Im interested and want to negotiate'}
                    style={{width: window.width * 0.9}}
                    onPress={() => {
                      onOpen();
                    }}
                  />
                )}
              </>
            )}
          </View>
          {openModal && (
            <BottomModal onDismiss={() => setopenModal(false)}>
              {component}
            </BottomModal>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default Detail;
const {StatusBarManager} = NativeModules;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingBottom: Platform.OS === 'ios' ? ms(25) : ms(10),
  },
  Box: {
    flexGrow: 1,
    alignItems: 'center',
  },
  Image: {
    backgroundColor: COLORS.lightGrey,
    width: window.width * 1,
    height: ms(250),

    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: StatusBarManager.HEIGHT + ms(10),
    paddingHorizontal: ms(20),

    resizeMode: 'cover',
  },
  Header: {
    width: ms(45),
    padding: ms(10),
    backgroundColor: COLORS.softDark,
    borderRadius: ms(50),
  },
  Card: {
    backgroundColor: COLORS.white,
    width: window.width * 0.9,
    top: ms(50),

    paddingHorizontal: ms(20),
    paddingVertical: ms(15),

    borderRadius: ms(10),
    elevation: ms(2),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: ms(0.25),
    shadowRadius: ms(2),
  },
  Name: {
    fontFamily: FONTS.Medium,
    fontSize: ms(16),
    color: COLORS.black,
  },
  CategoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  Category: {
    fontFamily: FONTS.Regular,
    fontSize: ms(10),
    color: COLORS.black,

    marginHorizontal: ms(2),
  },
  Price: {
    fontFamily: FONTS.Bold,
    fontSize: ms(14),
    color: COLORS.black,
  },
  Seller: {
    width: window.width * 0.9,
    marginTop: ms(80),
    paddingHorizontal: ms(20),

    flexDirection: 'row',
  },
  ProfileImage: {
    width: ms(50),
    height: ms(50),
    borderRadius: ms(10),
    backgroundColor: COLORS.lightGrey,
  },
  SellerText: {
    marginLeft: ms(10),
    justifyContent: 'center',
  },
  SellerName: {
    fontFamily: FONTS.Medium,
    fontSize: ms(14),
    color: COLORS.black,
  },
  SellerLocation: {
    fontFamily: FONTS.Regular,
    fontSize: ms(12),
    color: COLORS.black,
  },
  Description: {
    width: window.width * 0.9,
    paddingHorizontal: ms(25),
  },
  SubTitle: {
    fontFamily: FONTS.Medium,
    color: COLORS.black,
    fontSize: ms(14),

    marginTop: ms(15),
    marginBottom: ms(10),
  },
  DescriptionText: {
    fontFamily: FONTS.Regular,
    fontSize: ms(12),
    color: COLORS.black,
    textAlign: 'justify',
  },
  Button: {
    bottom: 0,
    position: 'absolute',
  },
  Text: {
    fontFamily: FONTS.Regular,
    color: COLORS.black,
  },
  textGrey: {
    color: COLORS.grey,
    fontFamily: FONTS.Regular,
    fontSize: 12,
    paddingBottom: 4,
  },
  imageUser: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 20,
    backgroundColor: 'black',
  },
});
