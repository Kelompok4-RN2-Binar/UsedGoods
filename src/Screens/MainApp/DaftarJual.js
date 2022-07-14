import {View, Text,SafeAreaView,ScrollView,Dimensions,Image,StatusBar,StyleSheet,TouchableOpacity} from 'react-native';
import React ,{useState,useEffect}from 'react';
import { Header } from '../../Components';
import { useSelector,useDispatch } from 'react-redux';
import { COLORS, FONTS } from '../../Utils';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const DaftarJual = ({navigation}) => {
  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);
  const [category, setCategory] = useState ([
    {name:'Product', icon: 'package-variant-closed'},
    {name:'Interested', icon: 'heart-outline'},
    {name:'Sold', icon: 'currency-usd'},
  ]);
  return (
    <SafeAreaView style={styles.Container}>
    <StatusBar backgroundColor="transparent" barStyle="light-content" translucent/>
      <Header title={'My Selling List'} />
      <ScrollView>
        <View style={{flexDirection:'row',marginVertical:15,width:window.width*0.8,alignSelf:'center'}}>
          <View style={{marginVertical:10,flexDirection:'row',justifyContent:'space-around',width:window.width*0.8}}>
            <View style={{flexDirection:'row'}}>
              <Image style={{width:40,height:40,borderRadius:8,marginRight:20}} source={{uri:userData.image}}/>
              <View style={{flexDirection:'column'}}>
                <Text>Nama Penjual</Text>
                <Text>Kota</Text>
              </View>
            </View>
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center',borderRadius:8,borderWidth:1,borderColor:COLORS.green,width:window.width*0.2}}>
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {category && category.map(item=>{
            return(
            <>
            <TouchableOpacity style={styles.Kategori2} onPress={() => {
                      // { navigation.navigate('Kategori', {idKategori: item.id, });}
                    }}>
                    <MaterialIcon name={item.icon} size={20} style={{marginRight: 5, color: COLORS.white}}/>
                    <Text style={{color: COLORS.white, fontFamily: FONTS.Regular, fontSize: 14,}}>{item.name}</Text>
            </TouchableOpacity>
            </>
            )})} 
        </ScrollView>
        <View style={{flexDirection:'row',flexWrap:'wrap',marginHorizontal:5,marginVertical:5,justifyContent:'flex-start',width:window.width*0.95,alignSelf:'center'}}>
          <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:window.width*0.4,height:200,borderWidth:0.5,borderColor:COLORS.grey,flexDirection:'column',marginHorizontal:10,marginVertical:10}}>
            <MaterialIcon name="plus" size={30} style={{color: COLORS.grey}}/>
            <Text>Add Product</Text>
          </TouchableOpacity>
         
          
        </View>
      </ScrollView>
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