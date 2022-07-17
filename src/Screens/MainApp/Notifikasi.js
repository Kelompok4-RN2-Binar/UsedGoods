import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React ,{useEffect} from 'react';
import {FONTS} from '../../Utils/Fonts';
import {COLORS} from '../../Utils/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { getNotificationSeller,NotificationScreen } from '../../Redux/actions';
import Seller from '../../Components/Notification/Seller';
import Buyer from '../../Components/Notification/Buyer';
const Notifikasi = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);
  const notifScreen = useSelector(state => state.appData.notifScreen);
   useEffect(() => {
    if (loginUser == null && userData == null) {
      navigation.navigate('Akun');
    } else {
      dispatch(getNotificationSeller(loginUser.access_token));
    }
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      <ScrollView>
        <View
          style={{
            margin: 16,
            marginTop: 46,
          }}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={[styles.textBold,{fontSize:18}]}>Notifikasi</Text>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity
              onPress={() => {
                dispatch(NotificationScreen('Seller'));
              }}>
              {notifScreen == 'Seller' ? (
                <Text style={styles.ActivePage}>Seller</Text>
              ) : (
                <Text style={styles.PasivePage}>Seller</Text>
              )}
            </TouchableOpacity>
            <Text style={[styles.textBold,{fontSize:18}]}>  /  </Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(NotificationScreen('Buyer'));
              }}>
              {notifScreen == 'Buyer' ? (
                <Text style={styles.ActivePage}>Buyer</Text>
              ) : (
                <Text style={styles.PasivePage}>Buyer</Text>
              )}
            </TouchableOpacity>
            </View>
            
          </View>
          
          {notifScreen=="Seller" ? <Seller/> : <Buyer/>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifikasi;
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width * 1,
    backgroundColor: COLORS.white,
    paddingBottom: 80,
  },
  textBold: {
    color: COLORS.black,
    fontFamily: FONTS.Bold,
    fontSize: 24,
  },
  text: {
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    fontSize: 22,
  },
  textGrey: {
    color: COLORS.grey,
    fontFamily: FONTS.Regular,
    fontSize: 12,
    paddingBottom: 4,
  },
  textBlack: {
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    fontSize: 14,
    paddingBottom: 4,
  },
  image: {
    width: 40,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 12,
  },
  dot: {
    backgroundColor: '#FA2C5A',
    width: 8,
    height: 8,
    borderRadius: 10,
    marginTop: 4,
    marginLeft: 8,
  },
  ActivePage: {
    fontFamily: FONTS.Bold,
    fontSize: 16,
    color: COLORS.black,
    borderBottomWidth: 2,
    borderColor: COLORS.red,
  },
  PasivePage: {
    fontFamily: FONTS.Regular,
    color: COLORS.grey,
    fontSize: 14,
  },
});
