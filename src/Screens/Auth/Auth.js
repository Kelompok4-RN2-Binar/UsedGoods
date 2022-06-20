import { ImageBackground, StatusBar, StyleSheet, Text, View ,Dimensions,SafeAreaView,Image,TouchableOpacity, ScrollView} from 'react-native'
import React,{useEffect} from 'react'
import { useState } from 'react'
import { Pattern ,LOGO} from '../../Assets/Images';
import { COLORS } from '../../Utils/Colors';
import { FONTS } from '../../Utils/Fonts';
import LoginInput from '../../Components/Input/LoginInput';
import { Formik } from 'formik';
import loginValidationSchema from '../../Components/Validation/loginValidation';
import RegisterValidationSchema from '../../Components/Validation/RegisterValidationSchema';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchingLogin ,fetchingRegister} from '../../Redux/actions';

const Auth = ({navigation}) => {
  const dispatch = useDispatch();
  const [Screen,setScreen] = useState('Signin');
  
  const isLogin = useSelector(state => state.appData.isLogin)
  useEffect(() => {
      
        if(isLogin==true){
          navigation.reset({
              index: 0,
              routes: [{ name: "MainApp" }],
              });
        }
    
    }, []);
  const goLogin = (email,password) =>{
    dispatch(fetchingLogin(email,password)).then(navigation.navigate("MainApp"))
  }
  const goRegister = (name,email,password,phone,address,city) => {
    dispatch(fetchingRegister(name,email,password,phone,address,city)).then(()=>{
      setScreen('Signin');
      alert("register sukses")
      })
  }
  return (
    <Formik
      initialValues={{Logemail:'',Logpassword:'',regEmail:'',regName:'',regPassword:'',regPhone:'',regAdress:'',regCity:''}} 
      onSubmit={values=>{
        if(Screen=='Signin'){
          goLogin(values.Logemail,values.Logpassword);
        }else{
          goRegister(values.regName,values.regEmail,values.regPassword,values.regPhone,values.regAdress,values.regCity);
        }
        }
      }
      >
    {({handleChange,handleBlur,handleSubmit,values,touched,isValid,errors}) =>(
    <SafeAreaView style={styles.Container}>
      <ScrollView contentContainerStyle={{flex:1,height:screen.height*1}}>
      <ImageBackground source={Pattern} style={[styles.Container,{marginTop:35}]}>
      <StatusBar backgroundColor={'transparent'} translucent/>
      <View style={styles.UsedGoods}>
        <Image source={LOGO} style={styles.ImageLogo}/>
        <View style={{paddingLeft:12,flexDirection:'row'}}>
          <Text  style={[styles.ImageUsedGoods,]}>Used</Text>
          <Text  style={[styles.ImageUsedGoods,{color:COLORS.green}]}>Goods</Text>
        </View>
      </View>
      {Screen=='Signin'?
      <View style={styles.card}>
        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:32}}>
          <TouchableOpacity onPress={()=>{setScreen('Signin')}}>
            <Text style={[styles.textAuth,{fontFamily:FONTS.Bold}]}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setScreen('Register')}}>
            <Text style={[styles.textAuth,{color:COLORS.grey}]}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop:56,alignSelf:'center'}}>
          <LoginInput icon={'email-outline'} placeholder={'Email'} value={values.Logemail} onChangeText={handleChange('Logemail')} error='input valid email' />
          <LoginInput icon={'lock-outline'} placeholder={'Password'} value={values.Logpassword} onChangeText={handleChange('Logpassword')} secureTextEntry={true} error='input valid password'/>
          <Text style={{fontSize:12,fontFamily:FONTS.Bold,fontWeight:'600',alignSelf:'flex-end',color:COLORS.dark}}>Forgot Password?</Text>
          <TouchableOpacity style={styles.buttonSignIn} onPress= {handleSubmit} >
            <Text style={styles.textSignin}>Sign In</Text>
          </TouchableOpacity>
        </View>     
      </View>  
      :
        <View style={[styles.card,{height:650}]}>
          <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:32}}>
            <TouchableOpacity onPress={()=>{setScreen('Signin')}}>
              <Text style={[styles.textAuth,{color:COLORS.grey}]}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setScreen('Register')}}>
              <Text style={[styles.textAuth,{fontFamily:FONTS.Bold}]}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop:56,alignSelf:'center'}}>
            <LoginInput icon={'email-outline'} placeholder={'Email'} value={values.regEmail} onChangeText={handleChange('regEmail')} error='Input Valid email'  secureTextEntry={false}/>
            <LoginInput icon={'account-outline'} placeholder={'Name'} value={values.regName} onChangeText={handleChange('regName')} error='Input Valid Name' />
            <LoginInput icon={'lock-outline'} placeholder={'Password'} value={values.regPassword} onChangeText={handleChange('regPassword')} secureTextEntry={true} error='Input Valid Password'/>
            <LoginInput icon={'home-outline'} placeholder={'Address'} value={values.regAdress} onChangeText={handleChange('regAddress')} secureTextEntry={false} error='Input Valid Address'/>
            <LoginInput icon={'phone-outline'} placeholder={'Phone Number'} value={values.regPhone} onChangeText={handleChange('regPhone')} secureTextEntry={false} error='Input Valid Phone'/>
            <LoginInput icon={'city-variant-outline'} placeholder={'City'} value={values.regCity} onChangeText={handleChange('regCity')} secureTextEntry={false} error='Input Valid City'/>
            <TouchableOpacity style={[styles.buttonSignIn,{marginTop:11}]} onPress= {handleSubmit} >
              <Text style={styles.textSignin}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
   
      }
      </ImageBackground>
      </ScrollView>
      
    </SafeAreaView>
       )}
      </Formik>
  )
}

export default Auth
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width:screen.width*1,
    backgroundColor:COLORS.black,
    justifyContent:'center'
  },
  ImageLogo: {
    width: 40,
    height: 40,
    // position:'absolute',
    // top:90,
    // left:68
  },
  ImageUsedGoods: {
    // position:'absolute',
    // top:90,
    // left:120,
    fontFamily:FONTS.Regular,
    fontWeight:'700',
    fontSize:32,
    color:COLORS.white
  },
  card:{
    // position:'absolute',
    // left:20,
    // top:198,
    width:screen.width*0.9,
    height:432,
    backgroundColor:COLORS.white,
    borderRadius:15,
    alignSelf:'center',
    
  },
  textAuth:{
    fontSize:20,
    fontFamily:FONTS.SemiBold,
    color:COLORS.black
  },
  UsedGoods:{
    flexDirection:'row',
    width:screen.width*1,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:50
  },
  icon:{
    width:44,
    height:44,
    borderRadius:5,
    backgroundColor:COLORS.socialMedia
  },
  buttonSignIn:{
    marginTop:62,
    width:screen.width*0.75,
    height:64,
    backgroundColor:COLORS.green,
    borderRadius:16,
    justifyContent:'center'
  },
  textSignin: {
    fontFamily:FONTS.Bold,
    fontSize:15,
    color:COLORS.white,
    alignSelf:'center',
  }
})