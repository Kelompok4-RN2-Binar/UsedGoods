import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../Utils/Colors';
import {FONTS} from '../../Utils/Fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { goLogout } from '../../Redux/actions';
import { useDispatch } from 'react-redux/';
const Akun = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Header}>
        <Text style={styles.Title}>My Account</Text>
        <Image style={styles.Image} />
      </View>
      <View style={styles.Content}>
        <Text style={styles.Name} numberOfLines={1}>
          Alvin Christian Davidson Therry
        </Text>
        <TouchableOpacity
          style={{...styles.Box, shadowColor: COLORS.black}}
          onPress={() => navigation.navigate('InfoAkun')}>
          <Icon
            style={styles.Icon}
            name="account-edit-outline"
            size={25}
            color={COLORS.black}
          />
          <Text style={styles.Text}>Edit Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.Box, shadowColor: COLORS.red}} onPress={()=>{
          dispatch(goLogout()).then(()=>{
            navigation.reset({
              index: 0,
              routes: [{ name: "Auth" }],
              });
            });
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

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  Header: {
    width: screen.width * 1,
    height: screen.height * 0.3,
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
    width: 150,
    height: 150,
    borderRadius: 15,
    top: screen.height * 0.075,
  },
  Content: {
    width: screen.width * 0.85,
    alignItems: 'center',
    marginTop: screen.height * 0.1,
  },
  Name: {
    fontFamily: FONTS.Bold,
    fontSize: 20,
    color: COLORS.black,
    marginBottom: screen.height * 0.05,
  },
  Box: {
    width: screen.width * 0.85,
    height: screen.height * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    elevation: 4,
    marginBottom: screen.height * 0.025,
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
