import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  NativeModules,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ms} from 'react-native-size-matters';
import {
  getBanner,
  getProduct,
  clearProduct,
  addWishlist,
  connectionChecker,
  getSpesificProductBuyer,
  getStatusOrderProduct,
  getWishlist,
  getStatusOrder
} from '../../Redux/actions';
import {
  CategoryButton,
  HomeShimmer,
  Input,
  ProductCard,
} from '../../Components';
import {COLORS} from '../../Utils';
import { GET_STATUS_ORDER_PRODUCT } from '../../Redux/types';

const Home = ({navigation}) => {
  const setCategory = id => (
    setIsSearch(''), setCurrentPage(1), setCurrentCategory(id)
  );

  const CATEGORY = [
    {
      name: 'All Product',
      icon: 'feature-search',
      onclick: () => setCategory(''),
    },
    {
      name: 'Elektronik',
      icon: 'desktop-mac',
      onclick: () => setCategory(1),
    },
    {
      name: 'Aksesoris Fashion',
      icon: 'tshirt-crew-outline',
      onclick: () => setCategory(7),
    },
    {
      name: 'Hobi dan Koleksit',
      icon: 'bike',
      onclick: () => setCategory(9),
    },
    {
      name: 'Perlengakapan Rumah',
      icon: 'sofa-single-outline',
      onclick: () => setCategory(12),
    },
  ];

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [currentCategory, setCurrentCategory] = useState('');
  const [isSearch, setIsSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const statusOrder = useSelector(state => state.appData.statusOrder);
  console.log("status order home",statusOrder)
  const loginUser = useSelector(state => state.appData.loginUser);
  console.log(loginUser)
  let banner = useSelector(state => state.appData.banner);
  const product = useSelector(state => state.appData.product);
  const connection = useSelector(state => state.appData.connection);
  let wishlist = useSelector(state => state.appData.wishlist);

  banner = banner?.map(({image_url}) => image_url);

  useMemo(
    () => dispatch(getProduct(currentCategory, isSearch, currentPage)),
    [currentPage],
  );

  const onSearch = () => {
    setLoading(true);
    dispatch(clearProduct());
    dispatch(getBanner());
    dispatch(getProduct(currentCategory, isSearch, currentPage)).then(() => {
      setLoading(false);
    });
  };

  const getData = () => {
    setLoading(true);
    dispatch(clearProduct());
    dispatch(getBanner());
    dispatch(getProduct(currentCategory, isSearch, currentPage)).then(() => {
      setLoading(false);
    });
    if(loginUser!=null){
      dispatch(getStatusOrder(loginUser.access_token)).then(() => {
        setLoading(false);
    });
    }
  };

  useMemo(() => {});

  useEffect(() => {
    dispatch(getWishlist(loginUser.access_token));
    dispatch(connectionChecker()).then(() => {
      getData();
  });
    
  }, [connection, currentCategory]);

  const headerComponent = (
    <View style={styles.Layer}>
      <View style={styles.Headers}>
        <Input
          placeholder="Search"
          onChangeText={val => setIsSearch(val)}
          onPress={() => onSearch()}
        />
        <TouchableOpacity
          style={styles.Wishlist}
          onPress={() => navigation.navigate('Wishlist')}>
          <Icon name={'book'} size={ms(30)} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <Carousel
        loop
        autoPlay={true}
        autoPlayInterval={5000}
        width={window.width * 0.9}
        height={ms(120)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={banner}
        renderItem={({item}) => (
          <Image style={styles.Banner} source={{uri: item}} />
        )}
      />
      <View style={styles.CategoryContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORY}
          renderItem={({item}) => (
            <CategoryButton
              name={item.name}
              icon={item.icon}
              onPress={item.onclick}
            />
          )}
          keyExtractor={item => item.name}
        />
      </View>
    </View>
  );

  const renderItem = ({item}) => (
    <ProductCard
      onPress={() => {
        
        if (loginUser) {
          dispatch({
            type: GET_STATUS_ORDER_PRODUCT,
            statusOrderProduct: null,
          });  
          dispatch(
            getSpesificProductBuyer(loginUser.access_token, item.id),
          ).then(() => {
            if (statusOrder != null) {
              var order = statusOrder.filter(itemS => {
                return itemS.product_id == item.id;
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
      onPressWishlist={() =>
        dispatch(addWishlist(item.id, loginUser?.access_token)).then(() =>
          dispatch(getWishlist(loginUser.access_token)),
        )
      }
      wishlist={wishlist}
    />
  );

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      {loading || !connection ? (
        <HomeShimmer />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          numColumns={2}
          data={product}
          renderItem={renderItem}
          ListHeaderComponent={headerComponent}
          onEndReached={() => setCurrentPage(currentPage + 1)}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.FlatlistContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => getData()}
              tintColor={COLORS.softDark}
              colors={['green']}
            />
          }
        />
      )}
    </View>
  );
};

export default Home;

const {StatusBarManager} = NativeModules;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingBottom: Platform.OS === 'ios' ? ms(75) : ms(60),
  },
  FlatlistContainer: {
    alignItems: 'center',
  },
  Layer: {
    width: window.width * 1,
    backgroundColor: COLORS.dark,
    alignItems: 'center',
    borderBottomRightRadius: ms(10),
    borderBottomLeftRadius: ms(10),
    paddingTop: StatusBarManager.HEIGHT + ms(10),
    paddingBottom: ms(18),
  },
  Headers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Wishlist: {
    marginBottom: ms(20),
    marginLeft: ms(10),
  },
  Banner: {
    backgroundColor: COLORS.lightGrey,
    height: ms(120),
    borderRadius: ms(10),
  },
  CategoryContainer: {
    width: window.width * 0.9,
    flexDirection: 'row',
    marginTop: ms(10),
  },
});
