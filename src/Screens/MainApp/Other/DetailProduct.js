import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Dimensions
} from 'react-native';
import React from 'react';
import {noImage} from '../../../Assets';
import {COLORS, FONTS} from '../../../Utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { deleteProduct, rupiah } from '../../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../Components/Others/Button';
const Detail = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);
  const productSpesific = useSelector(state => state.appData.productSpesific);
  const navigation = useNavigation();
  const goDelete = () =>{
    dispatch(deleteProduct(loginUser.access_token,productSpesific.id)).then(navigation.navigate("DaftarJual"))
  }
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'light-content'}
      />
    <ScrollView>
    {productSpesific!=null?
    <>
    <ImageBackground style={styles.gambar } source={productSpesific.image_url==null?noImage:{uri:productSpesific.image_url}}>
      <View style={{flexDirection: 'row',}}>
        <TouchableOpacity onPress={()=>{navigation.pop()}}>
          <Icon
            style={styles.back}
            name={'arrow-left'}
            size={35}
            color={COLORS.dark}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.container1,{borderWidth:0.5}]}>
        <View style={{margin:20,flexDirection:'column'}} >
          <Text style={{fontFamily:FONTS.Regular, fontSize: 20,color:COLORS.black}}>
            {productSpesific.name}
          </Text> 
          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
           
            {productSpesific && productSpesific.Categories.map(item=>{
              return(
              <>
                <Text style={{fontFamily:FONTS.Regular,color:COLORS.grey,fontSize:12}}>{item.name}, </Text>
              </>
            )})}
          </View>
        
          <Text style={{fontSize: 20,fontFamily:FONTS.Regular,color:COLORS.black}}>{`Rp. ${rupiah(productSpesific.base_price)}`} </Text>
          
        </View>
      </View>
      </ImageBackground>
      <View style={styles.container2}>
        <View style={styles.card}>
        
          <Image
            style={styles.image}
            source={{uri:userData.image_url}}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={[styles.Text,{fontSize:18}]}>{userData.full_name}</Text>
            <Text style={[styles.Text,{fontFamily:FONTS.Regular,fontSize:14}]}>{userData.city}</Text>
          </View>
                
        </View>
      </View>
      <View style={styles.container3}>
        <Text style={{fontFamily:FONTS.Regular, fontSize: 20,color:COLORS.black }}>Description</Text>
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
        
          <Text style={{ fontFamily:FONTS.Regular, fontSize: 16,color:COLORS.black}}>{productSpesific.description}</Text>
    
        </View>
      </View>
      <View style={{marginBottom:20,flexDirection:'column'}}>
        <Button caption={'Edit'} onPress={()=>{navigation.navigate("EditProduct",{
          data:productSpesific
        })}} />
        <Button caption={'Delete'} onPress={()=>{goDelete()}} />
      </View>
    </>
    :
    <></>
    }
      
    </ScrollView>
    </SafeAreaView>
  );
};

export default Detail;
const window = Dimensions.get('window');
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:COLORS.white
  },

  gambar: {
    width: window.width*1,
    height: 250,
  },
  back: {
    marginTop:30,
    paddingHorizontal: window.width * 0.05,
  },
  container1: {
    position:'absolute',
    borderRadius: 10,
    width: 330,
    backgroundColor: 'white',
    bottom:-80,
    alignSelf:'center'
  },
  container2: {
    flexDirection: 'row',
    borderRadius: 10,
    width: window.width * 1.0,
    height: 70,
    backgroundColor: 'white',
    marginTop:90,
    justifyContent:'center'

  },
  container3: {
    marginLeft:30,
    flexDirection: 'column',
    borderRadius: 10,
    marginTop: 25,
    width: 330,
    height: 150,
    flex: 1,
    backgroundColor: 'white',
  },
    Text: {
    fontSize: 12,
    fontFamily: FONTS.SemiBold,
    color: COLORS.black,
  },
  card:{
    marginVertical: 15,
    flexDirection: 'row',
    width: window.width * 0.8,

  },
  image :{
              width: 50,
              height: 50,
              borderRadius: 8,
              marginRight: 20,
              backgroundColor: 'black',
            }
});
