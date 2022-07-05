import axios from 'axios';
import {AUTH_SCREEN, FETCH_LOGIN, GET_USER_DATA, LOGOUT} from '../types';
import {URL} from '../../Utils/Url';
import Toast from 'react-native-toast-message';

export const authScreen = data => ({
  type: AUTH_SCREEN,
  payload: data,
});

export const fetchingLogin = data => {
  return async dispatch => {
    const {email, password} = data;
    await axios
      .post(URL + 'auth/login', {
        email: email,
        password: password,
      })
      .then(res => {
        console.log('User Info : ', res.data);
        Toast.show({
          type: 'success',
          text1: 'Login Successful!',
        });
        dispatch({
          type: FETCH_LOGIN,
          payload: res.data,
        });
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          Toast.show({
            type: 'error',
            text1: 'Email or Password Missmatch!',
          });
        }
      });
  };
};

export const fetchingRegister = data => {
  return async dispatch => {
    const {name, email, password, phone, address, city} = data;
    await axios
      .post(URL + 'auth/register', {
        full_name: name,
        email: email,
        password: password,
        phone_number: parseInt(phone),
        address: address,
        city: city,
      })
      .then(() => {
        dispatch(authScreen('Login'));
        Toast.show({
          type: 'success',
          text1: 'Register Successful!',
        });
      })
      .catch(function (error) {
        if (error.response.status == 400) {
          Toast.show({
            type: 'error',
            text1: 'Email Already Exists!',
          });
        }
      });
  };
};

export const goLogout = () => ({
  type: LOGOUT,
});

export const getUserData = AccessToken => {
  return async dispatch => {
    await axios
      .get(URL + 'auth/user', {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_USER_DATA,
          payload: res.data,
        });
      })
      .catch(function (error) {
        if (error.response.status == 400) {
          Toast.show({
            type: 'error',
            text1: 'Email Already Exists!',
          });
        }
      });
  };
};

export const updateUserData = (data, AccessToken) => {
  return async dispatch => {
    console.log(AccessToken);
    const {name, email, password, phone, address, city} = data;
    await axios
      .put(
        URL + 'auth/user',
        {
          full_name: name,
          email: email,
          password: password,
          phone_number: parseInt(phone),
          address: address,
          city: city,
        },
        {
          headers: {
            access_token: `${AccessToken}`,
          },
        },
      )
      .then(res => {
        console.log(res.data);
        dispatch({
          type: GET_USER_DATA,
          payload: res.data,
        });
        Toast.show({
          type: 'success',
          text1: 'Update Successful!',
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
