import {View, Text,SafeAreaView,ScrollView,Dimensions,Image,StatusBar,StyleSheet,TouchableOpacity,RefreshControl} from 'react-native';
import React ,{useState,useEffect,useCallback}from 'react';
import { Header } from '../../Components';
import { useSelector,useDispatch, } from 'react-redux';
import { COLORS, FONTS } from '../../Utils';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getProductSeller ,DaftarJualScreen} from '../../Redux/actions';
import Product from '../../Components/DaftarJual/Product';
const DaftarJual = ({navigation}) => {
  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);
  const daftarJualScreen = useSelector(state => state.appData.daftarJualScreen);
  const [category, setCategory] = useState ([
    {name:'Product', icon: 'package-variant-closed'},
    {name:'Interested', icon: 'heart-outline'},
    {name:'Sold', icon: 'currency-usd'},
  ]);
  const[refreshing, setRefreshing] = useState(false);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  useEffect(() => {
      if(loginUser==null){
        navigation.navigate("Akun")
      }else{
        dispatch(getProductSeller(loginUser.access_token));
        onRefresh();
      }   
  }, []);
  const onRefresh = useCallback(()=>{ 
    dispatch(getProductSeller(loginUser.access_token))
    setRefreshing(true);
    wait(300).then(()=>{setRefreshing(false) });
  }, []);
  return (
    <SafeAreaView style={styles.Container}>
    {loginUser==null? <></>
    :
    <>
    <StatusBar backgroundColor="transparent" barStyle="light-content" translucent/>
      <Header title={'My Selling List'} />
      <ScrollView   refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} 
        tintColor="green"
        colors={['green']}
      />}>
        <View style={{flexDirection:'row',marginVertical:15,width:window.width*0.8,alignSelf:'center'}}>
          <View style={{marginVertical:10,flexDirection:'row',justifyContent:'space-around',width:window.width*0.8}}>
            <View style={{flexDirection:'row'}}>
              <Image style={{width:40,height:40,borderRadius:8,marginRight:20,backgroundColor:'black'}} source={{uri:userData.image_url}}/>
              <View style={{flexDirection:'column'}}>
                <Text style={styles.Text}>{userData.full_name}</Text>
                <Text style={styles.Text}>{userData.city}</Text>
              </View>
            </View>
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center',borderRadius:8,borderWidth:1,borderColor:COLORS.green,width:window.width*0.2}} onPress={()=>{navigation.navigate("EditAccount")}}>
              <Text style={styles.Text}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
          {category && category.map(item=>{
            return(
            <>
            <TouchableOpacity style={styles.Kategori2} onPress={() => {
                    dispatch(DaftarJualScreen(item.name))
                    }}>
                    <MaterialIcon name={item.icon} size={20} style={{marginRight: 5, color: COLORS.white}}/>
                    <Text style={{color: COLORS.white, fontFamily: FONTS.Regular, fontSize: 14,}}>{item.name}</Text>
            </TouchableOpacity>
            </>
            )})} 
        </View>
        <View style={{marginHorizontal:5,marginVertical:5,alignSelf:'center'}}>
        {daftarJualScreen == 'Product' ? <Product/> : <></>}
        </View>
      </ScrollView>
    </>
    }
    </SafeAreaView>
  );
};

export default DaftarJual;
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