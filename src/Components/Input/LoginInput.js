import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../Utils/Colors';
import {FONTS} from '../../Utils/Fonts';

const LoginInput = ({
  icon,
  onBlur,
  placeholder,
  onChangeText,
  value,
  error,
  secureTextEntry,
}) => {
  const [isSecureText, setIsSecureText] = useState(secureTextEntry);
  return (
    <View style={styles.Container}>
      <View style={styles.Content}>
        <Icon name={icon} size={20} color={COLORS.dark} />
        
        <TextInput
          style={styles.Input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          placeholderTextColor={COLORS.grey}
          onBlur={onBlur}
        />
        {placeholder == 'Password' || placeholder == 'Confirm Password' ? (
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
      {error && <Text style={styles.Text}>{error}</Text> }
      
    </View>
  );
};

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
  },
  Content: {
    backgroundColor: COLORS.white,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 15,
    paddingHorizontal: 15,
    width: screen.width * 0.75,
  },
  Input: {
    width: screen.width * 0.5,
    fontFamily: FONTS.Regular,
    marginHorizontal: 10,
    fontSize: 14,
    color:COLORS.black
  },
  Text: {
    width: screen.width * 0.5,
    fontFamily: FONTS.Regular,
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 2,

  },
});

export default LoginInput;
