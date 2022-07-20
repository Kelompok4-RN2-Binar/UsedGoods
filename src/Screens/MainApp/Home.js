import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  NativeModules,
  StatusBar,
  RefreshControl
} from 'react-native';
import React, {useEffect, useState,useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import {getBanner, getProduct, getSpesificProduct, getSpesificProductBuyer,getStatusOrderProduct,getStatusOrder} from '../../Redux/actions';
import {CategoryButton, Input, ProductCard} from '../../Components';
import {COLORS} from '../../Utils';
import Toast from 'react-native-toast-message';
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const loginUser = useSelector(state => state.appData.loginUser);
  let banner = useSelector(state => state.appData.banner);
  const product = useSelector(state => state.appData.product);
  const statusOrder = useSelector(state => state.appData.statusOrder);
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
    if(loginUser!=null){
      dispatch(getStatusOrder(loginUser.access_token))
    }
  };



  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    dispatch(getProduct({category: currentCategory, page: currentPage}))
    if(loginUser!=null){
      dispatch(getStatusOrder(loginUser.access_token)).then(()=>{setRefreshing(true)})
    }
    wait(500).then(() => {
      setRefreshing(false);
    });
  }, []);

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
  const cekLogin = () =>{
    if(loginUser==null){
      Toast.show({
        type: 'error',
        text1: 'You Are not logged in',
      });
      navigation.navigate("Auth")
    }
  }
  const renderItem = ({item}) => (
    <ProductCard
      onPress={() =>{
        if(loginUser==null){
          cekLogin()
        }else{
          dispatch(getSpesificProductBuyer(loginUser.access_token, item.id)).then(
            ()=>{
              if(statusOrder!=null){
                var order=statusOrder.filter(itemS=>{
                  return itemS.product_id==item.id
                })
                var orderArray= order.map(o=>{
                  return o.id
                })
                const orderId  = orderArray.toString();
                if(orderId==''){      
                  navigation.navigate('Detail',{
                    user:'buyer',
                    order_id:null
                  })    
                }else{
                  dispatch(getStatusOrderProduct(loginUser.access_token,orderId)).then(
                    navigation.navigate('Detail',{
                      user:'buyer',
                      order_id:orderId
                    })
                  )
                }
              } 
            }      
          )
        }
      }}
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="green"
            colors={['green']}/>
      }/>
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
