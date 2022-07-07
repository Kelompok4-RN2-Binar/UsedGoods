import { 
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  TextInput,
} from 'react-native'
import React ,{useEffect}from 'react'
import {COLORS} from '../../Utils/Colors';
import {FONTS} from '../../Utils/Fonts';
import {GiftPicture} from '../../Assets/Images';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch} from 'react-redux';
import { FlatList} from 'react-native-gesture-handler'; 
import { useState } from 'react';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.appData.isLogin)
  const data = useSelector(state => state.appData.data)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState ([
    {id:'Semua', icon: 'search'},
    {id:'Hobi', icon: 'search'},
    {id:'Kendaraan', icon: 'search'},
    {id:'Aksesoris', icon: 'search'},
  ]);
  const [product, setProduct] = useState ('')
  console.log(data)
  useEffect(() => {
        if(isLogin==false){
          navigation.navigate("Auth")
        }
    }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent/>
      <View style={styles.Tone}></View>
      <View style={styles.searchBar}>
        <TextInput placeholder='Cari di UseGoods' value={search} onChangeText={text => setSearch(text)} style={styles.searchText}
      />
       <Icon name="search" size={25} color={COLORS.grey} style={styles.iconSearch}/>
      </View>
      <View style={{flexDirection:'column',marginLeft:16}}>
            <Image style={styles.gambar} source={GiftPicture}/>
            <Text style={styles.Diskon}>Bulan Ramadhan</Text>
            <Text style={styles.Diskon}>Banyak Diskon!</Text>
            <Text style={styles.Diskon1}>Diskon Hingga</Text>
            <Text style={styles.Diskon2}>60%</Text>
      </View>
      <View style={{flexDirection:'column',marginLeft:16}}>
        <Text style={styles.Kategori}>Telusuri Kategori</Text>
          <FlatList 
            showsHorizontalScrollIndicator={false}
            data={category}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.Kategori2} onPress={() => {
                    { navigation.navigate('Kategori', {idKategori: item.id, });}
                  }}>
                  <Icon name="search" size={20} style={{marginRight: 5, color: COLORS.white}}/>
                  <Text style={{color: COLORS.white, fontFamily: FONTS.Regular, fontSize: 14,}}>{item.id}</Text>
              </TouchableOpacity>
            )}
            horizontal
          />
      </View>
      <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={product}
          renderItem={({item}) => (
            <TouchableOpacity key={item.id} style={styles.ProductContainer}
                  onPress={() => {
                    { navigation.navigate('DetailProduct', {idProduct: item.id, });}
                  }}>
                  <Image
                    style={styles.ProductPoster}
                    source={{uri: item.poster_path}}
                  />
                </TouchableOpacity>
          )}
          vertical
        />
    </SafeAreaView>
  );
}

export default Home;

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  searchBar: {
    backgroundColor:COLORS.white,
    flexDirection:'row',
    margin: 16,
    marginTop: 45,
    padding: 5,
    alignItems:'center',
    borderRadius: 15, 
  },
  searchText:{
    flex: 1,
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    fontSize: 14,
  },
 iconSearch: {
    backgroundColor: COLORS.white,
    paddingRight: 8,
    justifyContent:'center',
    alignItems:'center',
  },
  gambar:{
    position: 'absolute',
    width: 100,
    height: 100,
    marginLeft: 230,
  },
  Diskon:{
    color: COLORS.white,
    fontFamily: FONTS.Bold,
    fontSize: 20,
  },
  Diskon1:{
    color: COLORS.white,
    fontFamily: FONTS.Regular,
    fontSize: 10,
  },
  Diskon2:{
    color: COLORS.red,
    fontFamily: FONTS.Regular,
    fontSize: 18,
  },
  Kategori:{
    marginTop: 5,
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    fontSize: 14,
  },
  Kategori2:{
    flexDirection:'row',
    backgroundColor: COLORS.softDark,
    marginHorizontal: 8,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius:10,
  },
  Tone: {
    position: 'absolute',
    paddingBottom:255,
    paddingHorizontal:180,
    backgroundColor: COLORS.dark,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  ProductContainer: {
    backgroundColor: COLORS.white,
    width: 156,
    height: 206,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
    marginVertical: 10,
    marginLeft: 16,
  },
  ProductPoster: {
    backgroundColor: COLORS.green,
    resizeMode: 'stretch',
    marginTop:10,
    width: 140,
    height: 100,
    borderRadius: 5,
  }
})