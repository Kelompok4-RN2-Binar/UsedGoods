import {View, Text,SafeAreaView,ScrollView,Dimensions,Image,StatusBar,StyleSheet,TouchableOpacity,RefreshControl} from 'react-native';
import React ,{}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS,FONTS } from '../../Utils';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getSpesificProduct, rupiah } from '../../Redux/actions';
const Product = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);
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
            <TouchableOpacity style={[styles.card,{justifyContent:'flex-start',alignItems:'center',width:window.width*0.4,height:240,flexDirection:'column',marginHorizontal:10,marginVertical:12}]}
            onPress={()=>{
              dispatch(getSpesificProduct(loginUser.access_token,item.id)).then(navigation.navigate("Detail"))
             }}>
              <Image source={{uri:item.image_url}} style={{width:window.width*0.35,height:100,borderRadius:8,marginTop:10}} />
              <View style={{flexDirection:'column',marginTop:5,alignItems:'flex-start',width:window.width*0.33,marginHorizontal:10,height:120}}>
                <Text style={[styles.Text,{fontSize:15}]}>{item.name}</Text>
                {item.Categories && item.Categories.map(item=>{
                return(
                <View style={{alignItems:'center'}}>
                  <Text style={[styles.Text,{fontSize:10,color:COLORS.grey}]}>{item.name}</Text>
                </View>
                )})}
                
                <Text style={[styles.Text,{fontSize:15,position:'absolute',bottom:10}]}>{`Rp. ${rupiah(item.base_price)}`}</Text>
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
  card:{
    backgroundColor: COLORS.white,
    padding: 8,
    borderRadius: 10,
    borderColor: 'red',
    width: 160,
    alignItems: 'center',
    elevation: 6,
  }
})