import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import {rupiah} from '../../Redux/actions';
import {COLORS, FONTS} from '../../Utils';

const Product = ({data, onPress, onPressWishlist, wishlist, label}) => {
  const wishlistButton = wishlist?.filter(i => i.product_id == data.id);
  return (
    <TouchableOpacity style={styles.Card} onPress={onPress}>
      <Image
        style={styles.Image}
        source={{uri: label ? data?.Product?.image_url : data?.image_url}}
      />
      <Text style={styles.Location} numberOfLines={1}>
        {label ? data?.Product?.location : data?.location}
      </Text>
      <Text style={styles.Name} numberOfLines={1}>
        {label ? data?.Product?.name : data?.name}
      </Text>
      <Text style={styles.Price} numberOfLines={1}>
        {`Rp. ${rupiah(label ? data?.Product?.base_price : data?.base_price)}`}
      </Text>
      {wishlist || label ? (
        <TouchableOpacity
          disabled={label ? false : wishlistButton?.length ? true : false}
          style={[
            {
              backgroundColor: label
                ? COLORS.red
                : wishlistButton?.length
                ? COLORS.dark
                : COLORS.softDark,
            },
            styles.AddWishlist,
          ]}
          onPress={onPressWishlist}>
          <Text style={styles.Wishlist}>
            {label ? 'Remove' : 'Add to Wishlist'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

export default Product;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Card: {
    backgroundColor: COLORS.white,
    width: window.width * 0.4,
    alignItems: 'center',
    margin: ms(10),
    padding: ms(10),

    borderRadius: ms(10),
    elevation: ms(2),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: ms(0.25),
    shadowRadius: ms(2),
  },
  Image: {
    backgroundColor: COLORS.lightGrey,
    resizeMode: 'cover',
    width: ms(130),
    height: ms(90),

    borderRadius: ms(10),
    marginBottom: ms(10),
  },
  Location: {
    fontFamily: FONTS.Regular,
    fontSize: ms(10),
    color: COLORS.dark,
  },
  Name: {
    fontFamily: FONTS.Bold,
    fontSize: ms(14),
    color: COLORS.dark,

    marginTop: ms(6),
  },
  Price: {
    fontFamily: FONTS.SemiBold,
    fontSize: ms(12),
    color: COLORS.dark,
  },
  AddWishlist: {
    alignItems: 'center',

    paddingHorizontal: ms(10),
    paddingVertical: ms(5),
    marginTop: ms(6),

    borderRadius: ms(10),
  },
  Wishlist: {
    fontFamily: FONTS.Medium,
    fontSize: ms(8),
    color: COLORS.white,
  },
});
