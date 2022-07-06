import axios from 'axios';
import {
  AUTH_SCREEN,
  FETCH_LOGIN,
  GET_USER_DATA,
  UPDATE_USER_DATA,
  LOGOUT,
} from '../types';
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
        } else {
          Toast.show({
            type: 'error',
            text1: error.response.data.message,
          });
        }
      });
  };
};

export const fetchingRegister = data => {
  return async dispatch => {
    const {image, name, email, password, phone, address, city} = data;
    await axios
      .post(URL + 'auth/register', {
        image: image,
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
        } else {
          Toast.show({
            type: 'error',
            text1: error.response.data.message,
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
        } else {
          Toast.show({
            type: 'error',
            text1: error.response.data.message,
          });
        }
      });
  };
};

export const updateUserData = (data, AccessToken) => {
  return async dispatch => {
    console.log(AccessToken);
    const {image, name, email, password, phone, address, city} = data;
    await axios
      .put(
        URL + 'auth/user',
        {
          image: image,
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
        dispatch({
          type: UPDATE_USER_DATA,
          payload: res.data,
        });
        Toast.show({
          type: 'success',
          text1: 'Update Account Successful!',
        });
      })
      .catch(function (error) {
        if (error.response.status == 400) {
          Toast.show({
            type: 'error',
            text1: 'Email Already Exists!',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: error.response.data.message,
          });
        }
      });
  };
};

export const updatePassword = (data, AccessToken) => {
  return async () => {
    const {currentPassword, newPassword, confirmPassword} = data;
    await axios
      .put(
        URL + 'auth/change-password',
        {
          current_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            access_token: `${AccessToken}`,
          },
        },
      )
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Update Password Successful!',
        });
      })
      .catch(function (error) {
        if (error.response.status == 400) {
          Toast.show({
            type: 'error',
            text1: 'Current Password is Wrong!',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: error.response.data.message,
          });
        }
      });
  };
};
