import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {fetchingLogin} from '../../Redux/actions';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Google} from '../../Assets';
import Input from '../Others/Input';
import Button from '../Others/Button';
import {COLORS, FONTS} from '../../Utils';
import { useNavigation } from '@react-navigation/native';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginValidation = yup.object().shape({
    email: yup
      .string()
      .email('Please Enter Valid Email!')
      .required('Email is Required!'),
    password: yup
      .string()
      .required('Password is Required!')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase and One Number!',
      ),
  });

  const goLogin = useCallback(values => {
    dispatch(fetchingLogin(values)).then(navigation.replace("MainApp"));
  }, []);

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={loginValidation}
      onSubmit={values => goLogin(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <Input
            icon={'email-outline'}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder={'Email'}
            error={errors.email}
          />
          <Input
            icon={'lock-outline'}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder={'Password'}
            error={errors.password}
            secureTextEntry={true}
          />
          <Button caption={'Login'} onPress={handleSubmit} />
          <TouchableOpacity style={styles.Button}>
            <Image style={styles.Icon} source={Google} />
            <Text style={styles.Text}>Login with Google</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Button: {
    backgroundColor: COLORS.black,
    width: window.width * 0.6,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 15,
  },
  Icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  Text: {
    fontFamily: FONTS.SemiBold,
    fontSize: 12,
    color: COLORS.white,
  },
});
