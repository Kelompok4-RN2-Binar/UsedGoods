import {View, Text,SafeAreaView,ScrollView,Dimensions,Image,StatusBar,StyleSheet,TouchableOpacity,RefreshControl} from 'react-native';
import React ,{}from 'react';
import { useSelector } from 'react-redux';
import { COLORS,FONTS } from '../../Utils';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Wishlist = () => {
  const navigation = useNavigation();
  const wishlistDataSeller = useSelector(state => state.appData.wishlistDataSeller);
  console.log("wishlist screen: ",wishlistDataSeller)
  return (
    <View>
      {wishlistDataSeller!=null ?
          <View style={{width:window.width*0.9,flexDirection:'row',flexWrap:'wrap',marginBottom:80,justifyContent:'flex-start'}}>    
          {wishlistDataSeller && wishlistDataSeller.map(item=>{
            return(
            <>
            <TouchableOpacity
                key={item}
                style={{flexDirection: 'row',marginTop: 24,}}>
                <View >
                  <Image style={styles.image} source={{uri:item.Product.image_url}} />
                </View>
                <View style={{flexDirection: 'column', marginLeft: 16}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingRight: 30,
                      width:window.width*0.8
                    }}>
                    <Text style={styles.textGrey}>Penawaran produk</Text>
                    <Text style={[styles.textGrey, {}]}>20 Apr 14:04</Text>
                  </View>
                  <Text style={[styles.textBlack,{marginTop:10}]}>{item.product_name}</Text>
                  <Text style={styles.textBlack}>Rp {item.base_price}</Text>
                  <Text style={styles.textBlack}>
                     Ditawar Rp. {item.price}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )})
          }
          </View>
          :
          <>
            <View style={{width:window.width*0.95,flexDirection:'row',flexWrap:'wrap',marginBottom:80,justifyContent:'center'}}>
                <Text style={[styles.Text,{alignSelf:'center',fontSize:18}]}>Theres no wishlist yet</Text>
            </View>    
          </>
          }
    </View>
  )
}

export default Wishlist

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  Text: {
    fontSize:12,
    fontFamily:FONTS.SemiBold,
    color:COLORS.black
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
  image: {
    width: 40,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 12,
  },
  textBlack: {
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    fontSize: 14,
    paddingBottom: 4,
  },
})