import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import {COLORS, FONTS} from '../../Utils';
import ButtonIcon from './ButtonIcon';

const Header = ({navigation, title}) => {
  return (
    <View style={styles.Container}>
      {navigation && (
        <ButtonIcon
          icon="keyboard-backspace"
          onPress={() => navigation.goBack()}
          color={COLORS.black}
        />
      )}
      <Text
        style={[
          styles.Title,
          {marginLeft: navigation ? window.width * 0.235 : 0},
        ]}>
        {title}
      </Text>
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
    marginBottom: ms(25),
  },
  Title: {
    marginLeft: window.width * 0.235,

    fontFamily: FONTS.Bold,
    fontSize: ms(18),
    textAlign: 'center',
    color: COLORS.black,
  },
});
