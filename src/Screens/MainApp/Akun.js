import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux/';
import {goLogout} from '../../Redux/actions';
import {userIcon} from '../../Assets';
import {ButtonShadow} from '../../Components';
import {COLORS} from '../../Utils/Colors';
import {FONTS} from '../../Utils/Fonts';

const Akun = ({navigation}) => {
  const dispatch = useDispatch();

  const userData = useSelector(state => state.appData.userData);
  const loginUser = useSelector(state => state.appData.loginUser);

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <View style={styles.Header}>
        <Text style={styles.Title}>My Account</Text>
        {loginUser && userData ? (
          <Image source={{uri: userData?.image_url}} style={styles.Image} />
        ) : (
          <Image source={userIcon} style={styles.Image} />
        )}
      </View>
      <View style={styles.Content}>
        {loginUser && userData ? (
          <>
            <Text style={styles.Name} numberOfLines={1}>
              {userData.full_name}
            </Text>
            <ButtonShadow
              shadowColor={COLORS.black}
              onPress={() => navigation.navigate('EditAccount')}
              icon={'account-edit-outline'}
              caption={'Edit Account'}
            />
            <ButtonShadow
              shadowColor={COLORS.black}
              onPress={() => navigation.navigate('EditPassword')}
              icon={'lock-reset'}
              caption={'Edit Password'}
            />
            <ButtonShadow
              shadowColor={COLORS.red}
              onPress={() => {
                dispatch(goLogout());
                navigation.navigate('Auth');
              }}
              icon={'logout-variant'}
              caption={'Logout'}
            />
          </>
        ) : (
          <>
            <ButtonShadow
              shadowColor={COLORS.black}
              onPress={() => {
                dispatch(goLogout());
                navigation.navigate('Auth');
              }}
              icon={'login-variant'}
              caption={'Login or Register'}
            />
          </>
        )}
      </View>
    </View>
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
    backgroundColor: COLORS.green,
    width: window.height * 0.15,
    height: window.height * 0.15,
    borderRadius: 15,
    top: window.height * 0.06,
  },
  Content: {
    width: window.width * 0.85,
    alignItems: 'center',
    marginTop: 65,
  },
  Name: {
    fontFamily: FONTS.Bold,
    fontSize: 20,
    color: COLORS.black,
  },
});
