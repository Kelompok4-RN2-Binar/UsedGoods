import axios from 'axios';
import {
  AUTH_SCREEN,
  FETCH_LOGIN,
  GET_USER_DATA,
  UPDATE_USER_DATA,
  LOGOUT,
  GET_BANNER,
  GET_PRODUCT,
  GET_PRODUCT_SELLER,
  DAFTARJUAL_SCREEN,
} from '../types';
import {URL} from '../../Utils/Url';
import Toast from 'react-native-toast-message';

export const authScreen = data => ({
  type: AUTH_SCREEN,
  payload: data,
});

export const DaftarJualScreen = data => ({
  type: DAFTARJUAL_SCREEN,
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
  console.log(data);
  return async dispatch => {
    const {image, name, email, password, phone, address, city} = data;
    const formData = new FormData();
    formData.append('full_name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone_number', phone);
    formData.append('address', address);
    formData.append('city', city);
    if (image == null || image == '') {
      formData.append('image', '');
    } else {
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
    }
    await axios
      .put(URL + 'auth/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          access_token: `${AccessToken}`,
        },
      })
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

export const getBanner = () => {
  return async dispatch => {
    await axios
      .get(URL + 'seller/banner')
      .then(res => {
        dispatch({
          type: GET_BANNER,
          payload: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getProduct = ({status, category_id, search}) => {
  return async dispatch => {
    await axios
      .get(`${URL}buyer/product`, {
        params: {
          status: 'available',
          category_id: category_id ? category_id : '',
          search: search ? search : '',
          page: 1,
          per_page: 20,
        },
      })
      .then(res => {
        dispatch({
          type: GET_PRODUCT,
          payload: res.data.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const postProduct = (data, AccessToken, category) => {
  return async dispatch => {
    const {name, description, base_price, location, image} = data;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('base_price', parseInt(base_price));
    formData.append('location', location);
    formData.append('category_ids', category);
    if (image == null || image == '') {
      formData.append('image', '');
    } else {
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
    }
    await axios
      .post(URL + 'seller/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Success Post Product!',
        });
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
        });
      });
  };
};

export const getProductSeller = AccessToken => {
  return async dispatch => {
    await axios
      .get(URL + 'seller/product', {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_PRODUCT_SELLER,
          payload: res.data,
        });
      })
      .catch(function (error) {
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
        });
      });
  };
};

export const rupiah = number => {
  let reverse = number.toString().split('').reverse().join(''),
    thousand = reverse.match(/\d{1,3}/g);
  thousand = thousand.join('.').split('').reverse().join('');
  return thousand;
};
