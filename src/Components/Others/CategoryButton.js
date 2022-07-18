import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../../Utils';

const CategoryButton = ({name, icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.Container} onPress={onPress}>
      <Icon name={icon} size={20} style={styles.Icon} />
      <Text style={styles.Name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: COLORS.softDark,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  Icon: {
    marginRight: 5,
    color: COLORS.white,
  },
  Name: {
    color: COLORS.white,
    fontFamily: FONTS.Regular,
    fontSize: 14,
  },
});
