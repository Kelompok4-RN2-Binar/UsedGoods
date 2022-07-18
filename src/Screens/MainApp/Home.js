import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  NativeModules,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import {getBanner, getProduct, getSpesificProduct} from '../../Redux/actions';
import {CategoryButton, Input, ProductCard} from '../../Components';
import {COLORS} from '../../Utils';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const loginUser = useSelector(state => state.appData.loginUser);
  let banner = useSelector(state => state.appData.banner);
  const product = useSelector(state => state.appData.product);

  banner = banner?.map(({image_url}) => image_url);

  const category = [
    {
      name: 'All Product',
      icon: 'feature-search',
      onclick: () =>
        dispatch(getProduct({category: currentCategory, page: currentPage})),
    },
    {
      name: 'Elektronik',
      icon: 'desktop-mac',
      onclick: () => dispatch(getProduct({category_id: 96, page: 1})),
    },
    {
      name: 'Aksesoris Fashion',
      icon: 'tshirt-crew-outline',
      onclick: () => dispatch(getProduct({category_id: 102, page: 1})),
    },
    {
      name: 'Hobi dan Koleksit',
      icon: 'bike',
      onclick: () => dispatch(getProduct({category_id: 104, page: 1})),
    },
    {
      name: 'Perlengakapan Rumah',
      icon: 'sofa-single-outline',
      onclick: () => dispatch(getProduct({category_id: 107, page: 1})),
    },
  ];

  const getData = () => {
    dispatch(getBanner());
    dispatch(getProduct({category: currentCategory, page: currentPage}));
  };

  useEffect(() => {
    getData();
  }, []);

  const headerComponent = () => (
    <View style={styles.Layer}>
      <Input placeholder="Search" />
      <Carousel
        loop
        autoPlay={true}
        autoPlayInterval={5000}
        width={window.width * 0.9}
        height={120}
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
          data={category}
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
      onPress={() =>
        dispatch(getSpesificProduct(loginUser.access_token, item.id)).then(
          navigation.navigate('Detail'),
        )
      }
      data={item}
    />
  );

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        numColumns={2}
        data={product}
        renderItem={renderItem}
        ListHeaderComponent={headerComponent}
        contentContainerStyle={styles.FlatlistContainer}
      />
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
    paddingBottom: Platform.OS === 'ios' ? 85 : 70,
  },
  FlatlistContainer: {
    alignItems: 'center',
  },
  Layer: {
    width: window.width * 1,
    backgroundColor: COLORS.dark,
    alignItems: 'center',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    height: Platform.OS === 'ios' ? 325 : 300,
    paddingTop: StatusBarManager.HEIGHT + 10,
  },
  Banner: {
    height: 120,
    borderRadius: 10,
  },
  CategoryContainer: {
    width: window.width * 0.9,
    flexDirection: 'row',
    marginTop: 10,
  },
});
