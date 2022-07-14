import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../../Utils';

const Header = ({navigation, title}) => {
  return (
    <View style={styles.Container}>
    {navigation&&
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="keyboard-backspace" size={25} color={COLORS.black} />
      </TouchableOpacity>
    }
      <Text style={[styles.Title,{marginLeft:title=="Lengkapi Detail Produk"? window.width * 0.12:window.width * 0.235},{marginLeft:navigation?window.width * 0.235:0}]}>{title}</Text>
    </View>
  );
};

export default Header;

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: window.width * 0.05,
    marginTop: 50,
    marginBottom: 25,
  },
  Title: {
    marginLeft: window.width * 0.235,
    fontFamily: FONTS.Bold,
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
  },
});
