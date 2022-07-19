import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import React, {useEffect} from 'react';
import {FONTS} from '../../Utils/Fonts';
import {COLORS} from '../../Utils/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';

import {getNotificationBuyer, getNotificationSeller, NotificationScreen} from '../../Redux/actions';
import Seller from '../../Components/Notification/Seller';
import Buyer from '../../Components/Notification/Buyer';

const Notifikasi = ({navigation}) => {
  const dispatch = useDispatch();

  const loginUser = useSelector(state => state.appData.loginUser);
  const notifScreen = useSelector(state => state.appData.notifScreen);

  useEffect(() => {
    dispatch(getNotificationSeller(loginUser.access_token));
    dispatch(getNotificationBuyer(loginUser.access_token));
    dispatch(NotificationScreen('Seller'));
  }, []);
  
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
        <View style={{flexDirection: 'row', justifyContent: 'space-between',width:window.width*0.9}}>
          <Text style={[styles.textBold, {fontSize: 18}]}>Notification</Text>
          <View style={{flexDirection: 'row'}}>
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
            <Text style={[styles.textBold, {fontSize: 18}]}> / </Text>
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
        {notifScreen == 'Seller' ? <Seller /> : <Buyer />}
    </View>
  );
};

export default Notifikasi;
const window = Dimensions.get('window');

const {StatusBarManager} = NativeModules;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: StatusBarManager.HEIGHT + 20,
    alignItems: 'center',
  },
  Box: {
    width: window.width * 0.9,
  },
  textBold: {
    color: COLORS.black,
    fontFamily: FONTS.Bold,
    fontSize: 24,
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
