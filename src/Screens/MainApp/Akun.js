import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  NativeModules,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux/';
import {useNavigation} from '@react-navigation/native';
import {ms} from 'react-native-size-matters';
import {getUserData, goLogout} from '../../Redux/actions';
import {userIcon} from '../../Assets';
import {AkunShimmer, ButtonShadow} from '../../Components';
import {COLORS, FONTS} from '../../Utils';

const Akun = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);

  useEffect(() => {
    loginUser
      ? dispatch(getUserData(loginUser?.access_token)).then(() =>
          setLoading(false),
        )
      : setLoading(false);
  }, [loginUser]);

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      {loading ? (
        <AkunShimmer />
      ) : (
        <>
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
                    navigation.navigate('Auth');
                    dispatch(goLogout());
                  }}
                  icon={'login-variant'}
                  caption={'Login or Register'}
                />
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default Akun;

const {StatusBarManager} = NativeModules;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',

    paddingTop: StatusBarManager.HEIGHT,
  },
  Header: {
    backgroundColor: COLORS.dark,
    width: ms(350),
    height: ms(175),
    justifyContent: 'flex-end',
    alignItems: 'center',

    borderBottomLeftRadius: ms(10),
    borderBottomRightRadius: ms(10),
  },
  Title: {
    fontFamily: FONTS.Bold,
    fontSize: ms(20),
    color: COLORS.white,

    top: ms(10),
  },
  Image: {
    backgroundColor: COLORS.green,
    width: ms(120),
    height: ms(120),
    top: ms(50),

    borderRadius: ms(10),
  },
  Content: {
    width: ms(320),
    alignItems: 'center',

    marginTop: ms(65),
  },
  Name: {
    fontFamily: FONTS.Bold,
    fontSize: ms(15),
    color: COLORS.black,

    marginBottom: ms(10),
  },
});
