import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux/';
import {COLORS} from '../../Utils/Colors';
import {FONTS} from '../../Utils/Fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {goLogout} from '../../Redux/actions';

const Akun = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.appData.userData);
  const uri = userData?.image_url;
  const fullName = userData?.full_name;

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'light-content'}
      />
      <View style={styles.Header}>
        <Text style={styles.Title}>My Account</Text>
        <Image source={{uri}} style={styles.Image} />
      </View>
      <View style={styles.Content}>
        <Text style={styles.Name} numberOfLines={1}>
          {fullName}
        </Text>
        <TouchableOpacity
          style={{...styles.Box, shadowColor: COLORS.black}}
          onPress={() => navigation.navigate('EditAccount')}>
          <Icon
            style={styles.Icon}
            name="account-edit-outline"
            size={25}
            color={COLORS.black}
          />
          <Text style={styles.Text}>Edit Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.Box, shadowColor: COLORS.black}}
          onPress={() => navigation.navigate('EditPassword')}>
          <Icon
            style={styles.Icon}
            name="lock-reset"
            size={25}
            color={COLORS.black}
          />
          <Text style={styles.Text}>Edit Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.Box, shadowColor: COLORS.red}}
          onPress={() => {
            dispatch(goLogout());
            navigation.replace('Auth');
          }}>
          <Icon
            style={styles.Icon}
            name="logout-variant"
            size={25}
            color={COLORS.black}
          />
          <Text style={styles.Text}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Akun;

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  Header: {
    width: window.width * 1,
    height: window.height * 0.3,
    backgroundColor: COLORS.dark,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  Title: {
    fontFamily: FONTS.Bold,
    fontSize: 24,
    color: COLORS.white,
  },
  Image: {
    backgroundColor: 'red',
    width: window.height * 0.15,
    height: window.height * 0.15,
    borderRadius: 15,
    top: window.height * 0.06,
  },
  Content: {
    width: window.width * 0.85,
    alignItems: 'center',
    marginTop: window.height * 0.075,
  },
  Name: {
    fontFamily: FONTS.Bold,
    fontSize: 20,
    color: COLORS.black,
    marginBottom: window.height * 0.025,
  },
  Box: {
    width: window.width * 0.85,
    height: window.height * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    elevation: 3,
    marginBottom: 25,
  },
  Icon: {
    marginHorizontal: 20,
  },
  Text: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: COLORS.black,
  },
});
