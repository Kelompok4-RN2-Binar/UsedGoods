import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../Utils/Colors';
import {FONTS} from '../../Utils/Fonts';

const Input = ({
  icon,
  placeholder,
  onChangeText,
  value,
  error,
  secureTextEntry,
  screen
}) => {
  const [isSecureText, setIsSecureText] = useState(secureTextEntry);
  const [isActive, setIsActive] = useState(false);
  return (
    <View style={styles.Container}>
      <View
        style={{
          ...styles.Content,
          borderColor: isActive ? COLORS.black : COLORS.grey,
        }}>
        <Icon style={styles.Icon} name={icon} size={20} color={COLORS.dark} />
        <TextInput
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          style={[styles.Input,{marginHorizontal:screen=="jual"? 0: 15,}]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={isSecureText}
          placeholderTextColor={COLORS.grey}
        />
        {placeholder == 'Password' ||
        placeholder == 'Current Password' ||
        placeholder == 'New Password' ||
        placeholder == 'Confirm Password' ? (
          <TouchableOpacity
            onPress={() => {
              setIsSecureText(val => !val);
            }}>
            <Icon
              name={isSecureText ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color={COLORS.dark}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text style={styles.Text}>{error}</Text>
    </View>
  );
};

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
  },
  Content: {
    width: window.width * 0.8,
    height: 52,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  Input: {
    width: '75%',
    fontFamily: FONTS.Regular,
    fontSize: 12,
    marginHorizontal: 15,
    color: '#000',
  },
  Text: {
    width: window.width * 0.7,
    fontFamily: FONTS.Regular,
    fontSize: 10,
    color: COLORS.red,
    textAlign: 'justify',
    marginVertical: 5,
  },
});

export default Input;
