import {View, Text,SafeAreaView,ScrollView,Dimensions,Image,StatusBar,StyleSheet,TouchableOpacity,RefreshControl} from 'react-native';
import React ,{}from 'react';
import { useSelector } from 'react-redux';
import { COLORS,FONTS } from '../../Utils';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { rupiah } from '../../Redux/actions';
const Product = () => {
  const navigation = useNavigation();
  const productDataSeller = useSelector(state => state.appData.productDataSeller);
  return (
    <View>
      {productDataSeller!=null &&
          <View style={{width:window.width*0.95,flexDirection:'row',flexWrap:'wrap',marginBottom:80,justifyContent:'center'}}>
          {productDataSeller.length<5&&
              <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:window.width*0.4,height:240,borderWidth:0.5,borderColor:COLORS.grey,flexDirection:'column',marginHorizontal:10,marginVertical:10}} onPress={()=>{navigation.navigate("Jual")}}>
                <MaterialIcon name="plus" size={30} style={{color: COLORS.grey}}/>
                <Text style={[styles.Text,{color:COLORS.grey}]}>Add Product</Text>
              </TouchableOpacity>
          }            
          {productDataSeller && productDataSeller.map(item=>{
            return(
            <>
            
            <TouchableOpacity style={{justifyContent:'flex-start',alignItems:'center',width:window.width*0.4,height:240,flexDirection:'column',marginHorizontal:10,marginVertical:12,borderRadius:8,borderWidth:1}}>
              <Image source={{uri:item.image_url}} style={{width:window.width*0.35,height:100,borderRadius:8,marginTop:10}} />
              <View style={{flexDirection:'column',marginTop:5,alignItems:'flex-start',width:window.width*0.33,marginHorizontal:10,height:120}}>
                <Text style={[styles.Text,{fontSize:15}]}>{item.name}</Text>
                {item.Categories && item.Categories.map(item=>{
                return(
                <View style={{alignItems:'center'}}>
                  <Text style={[styles.Text,{fontSize:10,color:COLORS.grey}]}>{item.name}</Text>
                </View>
                )})}
                
                <Text style={[styles.Text,{fontSize:15,position:'absolute',bottom:1}]}>{`Rp. ${rupiah(item.base_price)}`}</Text>
              </View>
              
            </TouchableOpacity>
            </>
          )})}
          </View>
          }
    </View>
  )
}

export default Product

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
})