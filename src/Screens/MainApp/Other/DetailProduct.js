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
  Dimensions,
  RefreshControl
} from 'react-native';
import React ,{useState,useEffect,useCallback} from 'react';
import {noImage} from '../../../Assets';
import {COLORS, FONTS} from '../../../Utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { buyProduct, deleteProduct, getStatusOrderProduct, rupiah } from '../../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../Components/Others/Button';
import BottomModal from '../../../Components/Others/BottomModal';
import { Input } from '../../../Components';
import { Formik } from 'formik';
import * as yup from 'yup';
const Detail = ({route}) => {
  const { user,order_id} = route.params; 
  console.log("order id detail :",order_id)
  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);
  const productSpesific = user=='seller'?useSelector(state => state.appData.productSpesific):useSelector(state => state.appData.productSpesificBuyer);
  const statusOrderProduct = user=='seller'?null:useSelector(state => state.appData.statusOrderProduct);
  console.log(statusOrderProduct)
  const order = useSelector(state => state.appData.order);
  const navigation = useNavigation();
  const [openModal, setopenModal] = useState(false);
  const [component,setComponent] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const goDelete = () =>{
    dispatch(deleteProduct(loginUser.access_token,productSpesific.id)).then(navigation.navigate("DaftarJual"))
  }
  const goBuy = (values,resetForm) =>{
    console.log(values)
    dispatch(buyProduct(values,loginUser.access_token)).then(
      ()=>{
            resetForm();
            setopenModal(false);
            dispatch(getStatusOrderProduct(loginUser.access_token,order.id)).then(()=>{setRefreshing(true);
              wait(500).then(() => {
              setRefreshing(false);
            });})
             
      }
    )
  }
  const buyValidation = yup.object().shape({
    base_price: yup.string().required('Price is Required!'),
  });
  const onOpen = () => {
    
    setopenModal(true);
    setComponent(
        <View style={{width:window.width,}}>
        <View style={{justifyContent:'center',alignItems:'center',width:window.width*0.9,alignSelf:'center'}}>
            <Text style={[styles.Text,{alignSelf:'center',fontSize:16,paddingTop:10,fontFamily:FONTS.SemiBold}]}>Enter your bid price</Text>
            <Text style={[styles.textGrey,{alignSelf:'center',fontSize:14,paddingTop:10}]}>Your bid price will be known by the seller, if the seller matches you will be contacted by the seller immediately</Text>
            <View style={{flexDirection: 'row',paddingTop:20,width:window.width*0.9,marginLeft:60}}>
              <Image
                style={styles.imageUser}
                source={{uri:productSpesific.image_url}}
              />
              <View style={{flexDirection: 'column',marginBottom:10}}>
                <Text style={[styles.Text,{fontSize:14}]}>{productSpesific.name}</Text>
                <Text style={[styles.Text,{fontSize:14,fontFamily:FONTS.Regular}]}>{`Rp. ${rupiah(productSpesific.base_price)}`}</Text>
              </View>
            </View>
            <Formik
                initialValues={{
                  base_price: '',
                  id: productSpesific.id
                }}
                validationSchema={buyValidation}
                onSubmit={(values, {resetForm}) => {
                  goBuy(values, resetForm);
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                }) => (
                  <View style={{flexDirection:'column',width:window.width*0.8,marginTop:30}}> 
      
                    <Text style={[styles.Text,{fontSize:14,fontFamily:FONTS.Regular}]}>Bid Price</Text>
                    <Input
                      onChangeText={handleChange('base_price')}
                      onBlur={handleBlur('base_price')}
                      value={values.base_price}
                      placeholder={'Rp 0.00'}
                      error={errors.base_price}
                      screen={'jual'}
                    />

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 5,
                      }}>
                      <Button caption={'Buy'} onPress={handleSubmit} style={{width:window.width*0.8,height:50,marginBottom:15}}/>
                    </View>
                  </View>
                )}
            </Formik>
          
        </View>
          </View>
    )
    };
  const onDismiss = () => {
      setopenModal(false);
  };

  useEffect(() => {
      if(user=='buyer'&&order_id!=''){
        dispatch(getStatusOrderProduct(loginUser.access_token,order_id))
      }else if(user=='buyer'&&statusOrderProduct!=null){
        dispatch(getStatusOrderProduct(loginUser.access_token,statusOrderProduct.id))
      }
    }, []);

  const onRefresh = useCallback(() => {
  
    wait(500).then(() => {
      setRefreshing(false);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'light-content'}
      />
    <ScrollView
        contentContainerStyle={styles.Box}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="green"
            colors={['green']}
          />
    }>
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
          {user=='seller'?
            <Image
            style={styles.image}
            source={{uri:userData.image_url}}
            />
            :
            <Image
            style={styles.image}
            source={{uri:productSpesific.User.image_url}}
            />
          }      
          
          <View style={{flexDirection: 'column'}}>
          {user=='seller'?
          <>
            <Text style={[styles.Text,{fontSize:18}]}>{userData.full_name}</Text>
            <Text style={[styles.Text,{fontFamily:FONTS.Regular,fontSize:14}]}>{userData.city}</Text>        
          </>
              :
          <>
            <Text style={[styles.Text,{fontSize:18}]}>{productSpesific.User.full_name}</Text>
            <Text style={[styles.Text,{fontFamily:FONTS.Regular,fontSize:14}]}>{productSpesific.User.city}</Text>
          </>    
          }
              
          </View>
                
        </View>
      </View>
      <View style={styles.container3}>
        <Text style={{fontFamily:FONTS.Regular, fontSize: 20,color:COLORS.black }}>Description</Text>
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
        
          <Text style={{ fontFamily:FONTS.Regular, fontSize: 16,color:COLORS.black}}>{productSpesific.description}</Text>
    
        </View>
      </View>
      <View style={{marginBottom:20,flexDirection:'column',position:'absolute',bottom:10,alignSelf:'center'}}>
      {
        user=='seller' &&
        <>
          <Button caption={'Edit'} onPress={()=>{navigation.navigate("EditProduct",{
            data:productSpesific
          })}} />
          <Button caption={'Delete'} onPress={()=>{goDelete()}} />
        </>
      }
      {
        user=='buyer' && 
        <>
        {
          statusOrderProduct!=null ?
          <>
          {statusOrderProduct.status=="pending" &&
          <Button caption={'Waiting for seller response'} style={{width:window.width*0.9,backgroundColor:COLORS.disabled,}} onPress={()=>{onOpen()}} disabled={true}/>
          }
          {statusOrderProduct.status=="accepted" &&
            <Button caption={'You already buy this product'} style={{width:window.width*0.9,backgroundColor:COLORS.disabled}} disabled={true} />
          }
           {statusOrderProduct.status=="declined" &&
            <Button caption={'Your bid in this product got declined'} style={{width:window.width*0.9,backgroundColor:COLORS.red}} disabled={true} />
          }
          </>
          :
          <Button caption={'Im interested and want to negotiate'} style={{width:window.width*0.9,}} onPress={()=>{onOpen()}} />
        }    
        </>
      }
        
      </View>
      {openModal && (
        <BottomModal  onDismiss={onDismiss}>
                  {component}
        </BottomModal>
      )}      
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
    backgroundColor:COLORS.white,
    height:window.height
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
    width: 330,
    backgroundColor: 'white',
    bottom:-80,
    alignSelf:'center',
    borderRadius: 10,
    borderColor: 'red',
    elevation: 6,
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
    flexDirection: 'column',
    borderRadius: 10,
    marginTop: 25,
    width: 330,
    height: 150,
    backgroundColor: 'white',
    alignSelf:'center',
    marginLeft:25,
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
  },
  imageUser:{
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 20,
    backgroundColor: 'black',
  },
  Box: {
    flexGrow: 1,
    paddingBottom: 25,
    height:window.height*1
  },
  textGrey: {
    color: COLORS.grey,
    fontFamily: FONTS.Regular,
    fontSize: 12,
    paddingBottom: 4,
  },
});
