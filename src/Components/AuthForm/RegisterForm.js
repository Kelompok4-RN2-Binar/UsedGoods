import {View} from 'react-native';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchingRegister, updateUserData} from '../../Redux/actions';
import {Formik} from 'formik';
import * as yup from 'yup';
import Input from '../Others/Input';
import Button from '../Others/Button';
import ImageShow from '../Others/ImageShow';
import ImagePicker from 'react-native-image-crop-picker';
const RegisterForm = ({label}) => {
  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);
  console.log("user data: ",userData)
  const registerValidation = yup.object().shape({
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

  const updateValidation = yup.object().shape({
    name: yup.string().required('Name is Required!'),
    email: yup
      .string()
      .email('Please Enter Valid Email!')
      .required('Email is Required!'),
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

  const goUpdate = useCallback(values => {
    dispatch(updateUserData(values, loginUser.access_token));
  }, []);

  const imagePicker = async handleChange => {
    ImagePicker.openPicker({
      width: 450,
      height: 450,
      cropping: true,
    }).then(image => {
      console.log(image);
      const uploadUri = Platform.OS === 'IOS' ? image.path.replace('file://', '') : image.path;
      handleChange(uploadUri);
    });
  };

  return (
    <Formik
      initialValues={
        label
          ? {
              image: userData.image_url,
              name: userData.full_name,
              email: userData.email,
              password: '',
              phone: 0 + userData.phone_number,
              address: userData.address,
              city: userData.city,
            }
          : {
              image: '',
              name: '',
              email: '',
              password: '',
              phone: '',
              address: '',
              city: '',
            }
      }
      validationSchema={label ? updateValidation : registerValidation}
      onSubmit={values => (label ? goUpdate(values) : goRegister(values))}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
        {label&&
          <ImageShow onPress={() => imagePicker(handleChange('image'))} uri={values.image}/>
        }
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
          {label ? null : (
            <Input
              icon={'lock-outline'}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder={label ? 'New Password' : 'Password'}
              error={errors.password}
              secureTextEntry={true}
            />
          )}
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
          <Button
            caption={label ? 'Update' : 'Register'}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;
