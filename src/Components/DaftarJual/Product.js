import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getSpesificProduct} from '../../Redux/actions';
import {COLORS, FONTS} from '../../Utils';
import {ProductCard} from '..';

const Product = () => {
  const window = Dimensions.get('window');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loginUser = useSelector(state => state.appData.loginUser);
  const productDataSeller = useSelector(
    state => state.appData.productDataSeller,
  );

  return (
    <View>
      {productDataSeller != null && (
        <View
          style={{
            width: window.width * 0.95,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {productDataSeller.length < 5 && (
            <TouchableOpacity
              style={{
                width: window.width * 0.4,
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginHorizontal: 10,
                marginVertical: 10,

                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: COLORS.grey,
              }}
              onPress={() => navigation.navigate('Jual')}>
              <Icon name="plus" size={30} style={{color: COLORS.grey}} />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: FONTS.SemiBold,
                  color: COLORS.grey,
                }}>
                Add Product
              </Text>
            </TouchableOpacity>
          )}
          {productDataSeller &&
            productDataSeller.map(item => (
              <ProductCard
                key={item.id}
                data={item}
                onPress={() =>
                  dispatch(
                    getSpesificProduct(loginUser.access_token, item.id),
                  ).then(navigation.navigate('Detail'))
                }
              />
            ))}
        </View>
      )}
    </View>
  );
};

export default Product;
