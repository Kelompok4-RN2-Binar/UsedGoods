import {View} from 'react-native';
import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {fetchingLogin} from '../../Redux/actions';
import {Formik} from 'formik';
import * as yup from 'yup';
import Input from '../Others/Input';
import Button from '../Others/Button';

const LoginForm = () => {
  const dispatch = useDispatch();

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
    dispatch(fetchingLogin(values));
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
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;
