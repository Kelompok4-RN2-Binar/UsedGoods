import axios from 'axios';
import {AUTH_SCREEN, FETCH_LOGIN} from '../types';
import {URL} from '../../Utils/Url';
import Toast from 'react-native-toast-message';

export const authScreen = screen => ({
  type: AUTH_SCREEN,
  payload: screen,
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
          isLogin: true,
          data: res.data,
          token: res.data.access_token,
        });
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          alert(
            'Email or Password Missmatch! Please Input an a Correct Email & Password',
          );
        } else if (error.response.status == 400) {
          alert('Fill Username or password');
        } else {
          alert(error);
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
      .then(res => {
        dispatch(authScreen('Login'));
        Toast.show({
          type: 'success',
          text1: 'Register Successful!',
        });
        console.log('User Info : ', res.data);
      })
      .catch(function (error) {
        alert(error.message);
      });
  };
};

export const goLogout = () => {
  return async dispatch => {
    dispatch({
      type: FETCH_LOGIN,
      isLogin: false,
      data: [],
      token: null,
    });
  };
};
