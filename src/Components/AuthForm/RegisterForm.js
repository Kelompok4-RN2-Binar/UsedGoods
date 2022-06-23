import {View} from 'react-native';
import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {fetchingRegister} from '../../Redux/actions';
import {Formik} from 'formik';
import * as yup from 'yup';
import Input from '../Others/Input';
import Button from '../Others/Button';

const RegisterForm = () => {
  const dispatch = useDispatch();

  const loginValidation = yup.object().shape({
    name: yup.string().required('Name is Required!'),
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
    phone: yup
      .string()
      .required('Phone Number is Required!')
      .matches(/^[0][0-9]{10,14}$/, 'Please Enter Valid Phone Number'),
    address: yup.string().required('Address is Required!'),
    city: yup.string().required('City is Required!'),
  });

  const goRegister = useCallback(values => {
    dispatch(fetchingRegister(values));
  }, []);

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        city: '',
      }}
      validationSchema={loginValidation}
      onSubmit={values => goRegister(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          <Input
            icon={'account-outline'}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder={'Name'}
            error={errors.name}
          />
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
          <Input
            icon={'phone-outline'}
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.phone}
            placeholder={'Phone Number'}
            error={errors.phone}
          />
          <Input
            icon={'home-outline'}
            onChangeText={handleChange('address')}
            onBlur={handleBlur('address')}
            value={values.address}
            placeholder={'Address'}
            error={errors.address}
          />
          <Input
            icon={'city-variant-outline'}
            onChangeText={handleChange('city')}
            onBlur={handleBlur('city')}
            value={values.city}
            placeholder={'City'}
            error={errors.city}
          />
          <Button caption={'Register'} onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;
