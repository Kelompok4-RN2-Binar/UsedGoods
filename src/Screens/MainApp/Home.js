import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import {getBanner, getProduct, rupiah} from '../../Redux/actions';
import {CategoryButton, Input} from '../../Components';
import {COLORS, FONTS} from '../../Utils';
import ProductView from '../../Components/Others/ProductView';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  let banner = useSelector(state => state.appData.banner);
  const product = useSelector(state => state.appData.product);
  const [search, setSearch] = useState('');

  banner = banner?.map(({image_url}) => image_url);

  const category = [
    {
      name: 'All Product',
      icon: 'feature-search',
      onclick: () => dispatch(getProduct({category_id: ''})),
    },
    {
      name: 'Elektronik',
      icon: 'desktop-mac',
      onclick: () => dispatch(getProduct({category_id: 96})),
    },
    {
      name: 'Aksesoris Fashion',
      icon: 'tshirt-crew-outline',
      onclick: () => dispatch(getProduct({category_id: 102})),
    },
    {
      name: 'Hobi dan Koleksit',
      icon: 'bike',
      onclick: () => dispatch(getProduct({category_id: 104})),
    },
    {
      name: 'Perlengakapan Rumah',
      icon: 'sofa-single-outline',
      onclick: () => dispatch(getProduct({category_id: 107})),
    },
  ];

  const getData = () => {
    dispatch(getBanner());
    dispatch(getProduct({category_id: ''}));
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
      <View style={styles.ChoiceContainer}>
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

  const footerComponent = () => (
    <View>
      <TouchableOpacity></TouchableOpacity>
      <TouchableOpacity></TouchableOpacity>
      <TouchableOpacity></TouchableOpacity>
      <TouchableOpacity></TouchableOpacity>
    </View>
  );

  const renderItem = ({item}) => (
    <View style={styles.renderItemContainer}>
      <TouchableOpacity style={styles.Card}>
        <Image style={styles.Image} source={{uri: item.image_url}} />
        <Text style={styles.Location} numberOfLines={1}>
          {item.location}
        </Text>
        <Text style={styles.Name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.Price} numberOfLines={1}>
          {`Rp. ${rupiah(item.base_price)}`}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={COLORS.dark} barStyle="light-content" />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        numColumns={2}
        data={product}
        renderItem={renderItem}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={footerComponent}
        contentContainerStyle={styles.FlatlistContainer}
      />
    </SafeAreaView>
  );
};

export default Home;

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingBottom: 90,
  },
  renderItemContainer: {
    width: window.width * 0.5,
    alignItems: 'center',
    marginVertical: 10,
  },
  Layer: {
    width: window.width * 1,
    backgroundColor: COLORS.dark,
    alignItems: 'center',
    paddingTop: 40,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    height: 325,
    marginBottom: 10,
  },
  Banner: {
    height: 120,
    borderRadius: 10,
  },
  ChoiceContainer: {
    flexDirection: 'row',
    width: window.width * 0.9,
    marginTop: 15,
  },
  Card: {
    backgroundColor: COLORS.white,
    padding: 8,
    borderRadius: 10,
    borderColor: 'red',
    width: 160,
    alignItems: 'center',
    elevation: 6,
  },
  Image: {
    resizeMode: 'stretch',
    width: 140,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  Location: {
    fontFamily: FONTS.Regular,
    fontSize: 10,
    color: COLORS.dark,
  },
  Name: {
    fontFamily: FONTS.Bold,
    fontSize: 14,
    color: COLORS.dark,
  },
  Price: {
    fontFamily: FONTS.SemiBold,
    fontSize: 12,
    color: COLORS.dark,
  },
});
