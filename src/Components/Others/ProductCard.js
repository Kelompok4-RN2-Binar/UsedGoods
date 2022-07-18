import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {rupiah} from '../../Redux/actions';
import {COLORS, FONTS} from '../../Utils';

const Product = ({data, onPress}) => {
  return (
    <TouchableOpacity style={styles.Card} onPress={onPress}>
      <Image style={styles.Image} source={{uri: data?.image_url}} />
      <Text style={styles.Location} numberOfLines={1}>
        {data?.location}
      </Text>
      <Text style={styles.Name} numberOfLines={1}>
        {data?.name}
      </Text>
      <Text style={styles.Price} numberOfLines={1}>
        {`Rp. ${rupiah(data?.base_price)}`}
      </Text>
    </TouchableOpacity>
  );
};

export default Product;

const styles = StyleSheet.create({
  Card: {
    backgroundColor: COLORS.white,
    width: 160,
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  Image: {
    resizeMode: 'cover',
    width: 140,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  Location: {
    fontFamily: FONTS.Regular,
    fontSize: 10,
    color: COLORS.dark,
  },
  Name: {
    fontFamily: FONTS.Bold,
    fontSize: 14,
    color: COLORS.dark,
    marginVertical: 4,
  },
  Price: {
    fontFamily: FONTS.SemiBold,
    fontSize: 12,
    color: COLORS.dark,
  },
});
