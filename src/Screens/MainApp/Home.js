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
import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import {
  getBanner,
  getProduct,
  getSpesificProductBuyer,
  getStatusOrderProduct,
  getStatusOrder,
  clearProduct,
  addWishlist,
  connectionChecker,
} from '../../Redux/actions';
import {
  CategoryButton,
  HomeShimmer,
  Input,
  ProductCard,
} from '../../Components';
import {CATEGORY, COLORS} from '../../Utils';
import Toast from 'react-native-toast-message';
import {useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ms} from 'react-native-size-matters';

const Home = ({navigation}) => {
  const CATEGORY = [
    {
      id: 1,
      name: 'All Product',
      icon: 'feature-search',
      onclick: () => {
        currentCategory === ''
          ? setCurrentCategory(null)
          : setCurrentCategory('');
      },
    },
    {
      id: 2,
      name: 'Elektronik',
      icon: 'desktop-mac',
      onclick: () => setCurrentCategory(96),
    },
    {
      id: 3,
      name: 'Aksesoris Fashion',
      icon: 'tshirt-crew-outline',
      onclick: () => setCurrentCategory(102),
    },
    {
      id: 4,
      name: 'Hobi dan Koleksit',
      icon: 'bike',
      onclick: () => setCurrentCategory(104),
    },
    {
      id: 5,
      name: 'Perlengakapan Rumah',
      icon: 'sofa-single-outline',
      onclick: () => setCurrentCategory(107),
    },
  ];

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [currentCategory, setCurrentCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearch, setIsSearch] = useState('');

  const loginUser = useSelector(state => state.appData.loginUser);

  let banner = useSelector(state => state.appData.banner);
  const product = useSelector(state => state.appData.product);
  const connection = useSelector(state => state.appData.connection);
  console.log(connection);

  const statusOrder = useSelector(state => state.appData.statusOrder);

  banner = banner?.map(({image_url}) => image_url);

  useMemo(() => {
    setLoading(true);
    dispatch(clearProduct());
    dispatch(
      getProduct({category_id: currentCategory, search: '', page: 1}),
    ).then(() => setLoading(false));
  }, [currentCategory]);

  const onSearch = () => {
    setLoading(true);
    dispatch(clearProduct());
    dispatch(getProduct({category_id: '', search: isSearch, page: 1})).then(
      () => setLoading(false),
    );
  };

  useMemo(() => {
    dispatch(
      getProduct({
        category_id: currentCategory,
        search: isSearch,
        page: currentPage,
      }),
    );
  }, [currentPage]);

  const getData = () => {
    dispatch(getBanner());
    setCurrentCategory('');
    if (loginUser != null) {
      dispatch(getStatusOrder(loginUser.access_token));
    }
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    dispatch(getProduct({category: currentCategory, page: currentPage}));
    if (loginUser != null) {
      dispatch(getStatusOrder(loginUser.access_token)).then(() => {
        setRefreshing(true);
      });
    }
    wait(500).then(() => {
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    dispatch(connectionChecker());
    getData();
  }, [connection]);

  const headerComponent = (
    <View style={styles.Layer}>
      <View style={styles.Headers}>
        <Input
          placeholder="Search"
          onChangeText={val => setIsSearch(val)}
          onPress={onSearch}
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
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );

  const cekLogin = () => {
    if (loginUser == null) {
      Toast.show({
        type: 'error',
        text1: 'You Are not logged in',
      });
      navigation.navigate('Auth');
    }
  };

  const renderItem = ({item}) => (
    <ProductCard
      onPress={() => {
        if (loginUser == null) {
          cekLogin();
        } else {
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
        }
      }}
      data={item}
      onPressWishlist={() =>
        dispatch(addWishlist(item.id, loginUser?.access_token))
      }
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
              onRefresh={onRefresh}
              tintColor="green"
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
