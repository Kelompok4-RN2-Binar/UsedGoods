import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FONTS} from '../../Utils/Fonts';
import {COLORS} from '../../Utils/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {ms} from 'react-native-size-matters';
import {
  connectionChecker,
  getNotificationBuyer,
  getNotificationSeller,
  NotificationScreen,
} from '../../Redux/actions';
import Seller from '../../Components/Notification/Seller';
import Buyer from '../../Components/Notification/Buyer';
import {NotificationShimmer} from '../../Components';

const Notifikasi = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const loginUser = useSelector(state => state.appData.loginUser);
  const notifScreen = useSelector(state => state.appData.notifScreen);
  const connection = useSelector(state => state.appData.connection);

  useEffect(() => {
    dispatch(connectionChecker());
    dispatch(NotificationScreen('Seller'));
    dispatch(getNotificationSeller(loginUser.access_token));
    dispatch(getNotificationBuyer(loginUser.access_token)).then(() =>
      setLoading(false),
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      {loading || !connection ? (
        <NotificationShimmer />
      ) : (
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: window.width * 0.9,
            }}>
            <Text style={[styles.textBold, {fontSize: ms(18)}]}>
              Notification
            </Text>
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
              <Text style={[styles.textBold, {fontSize: ms(18)}]}> / </Text>
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
        </ScrollView>
      )}
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
    paddingTop: StatusBarManager.HEIGHT + ms(20),
    paddingBottom: Platform.OS === 'ios' ? ms(75) : ms(60),
    alignItems: 'center',
  },
  Box: {
    width: window.width * 0.9,
  },
  textBold: {
    color: COLORS.black,
    fontFamily: FONTS.Bold,
    fontSize: ms(20),
  },
  ActivePage: {
    fontFamily: FONTS.Bold,
    fontSize: ms(16),
    color: COLORS.black,
    borderBottomWidth: 2,
    borderColor: COLORS.red,
  },
  PasivePage: {
    fontFamily: FONTS.Regular,
    color: COLORS.grey,
    fontSize: ms(14),
  },
});
