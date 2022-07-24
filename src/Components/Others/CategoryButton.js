import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ms} from 'react-native-size-matters';
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
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ms(5),
    paddingHorizontal: ms(15),
    paddingVertical: ms(10),
    borderRadius: ms(10),
  },
  Icon: {
    marginRight: ms(8),
    color: COLORS.white,
  },
  Name: {
    color: COLORS.white,
    fontFamily: FONTS.Regular,
    fontSize: ms(12),
  },
});
