import {Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../../Utils';

const ButtonShadow = ({shadowColor, onPress, icon, caption}) => {
  return (
    <TouchableOpacity
      style={{...styles.Box, shadowColor: shadowColor}}
      onPress={onPress}>
      <Icon style={styles.Icon} name={icon} size={25} color={COLORS.black} />
      <Text style={styles.Text}>{caption}</Text>
    </TouchableOpacity>
  );
};

export default ButtonShadow;

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Box: {
    width: window.width * 0.85,
    height: window.height * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,

    marginTop: 20,

    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
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
