import {Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../Utils/Colors';

const ImagePicker = ({onPress, uri}) => {
  let image = uri
    ? uri
    : 'https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg';
  return (
    <TouchableOpacity style={styles.Button} onPress={onPress}>
      <Image source={{uri: image}} style={styles.Image} />
      <Icon
        name="camera-outline"
        size={25}
        color={COLORS.white}
        style={styles.Icon}
      />
    </TouchableOpacity>
  );
};

export default ImagePicker;

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Button: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.black,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: window.height * 0.025,
    borderRadius: 15,
  },
  Image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  Icon: {
    position: 'absolute',
    color: COLORS.green,
  },
});
