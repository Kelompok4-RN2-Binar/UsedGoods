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
  GET_WISHLIST_SELLER,
  GET_NOTIFICATION_BUYER,
  GET_NOTIFICATION_SELLER,
  NOTIFICATION_SCREEN,
  GET_CATEGORY,
  GET_SPESIFIC_PRODUCT,
  GET_WISHLIST_SPESIFIC,
  GET_SPESIFIC_PRODUCT_BUYER,
  GET_STATUS_ORDER_PRODUCT,
  GET_STATUS_ORDER,
  GET_ORDER,
  GET_DETAIL_NOTIFICATION,
  GET_SOLD_SELLER,
  CLEAR_PRODUCT,
  ADD_WISHLIST,
  CONNECTED,
  NOT_CONNECTED,
} from '../types';
import {URL} from '../../Utils/Url';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';

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
          console.log(error);
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
        } else {
          console.log(error);
        }
      });
  };
};

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
          console.log(error);
        }
      });
  };
};

export const updatePassword = (data, accessToken) => {
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
            access_token: `${accessToken}`,
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
          console.log(error);
        }
      });
  };
};

export const goLogout = () => ({
  type: LOGOUT,
});

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

export const getProduct = ({page, category_id, search}) => {
  console.log(page, search, category_id);
  return async dispatch => {
    await axios
      .get(`${URL}buyer/product`, {
        params: {
          status: 'available',
          category_id: category_id ? category_id : '',
          search: search ? search : '',
          page: page,
          per_page: 20,
        },
      })
      .then(res => {
        console.log(res.data);
        dispatch({
          type: GET_PRODUCT,
          payload: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const clearProduct = () => ({
  type: CLEAR_PRODUCT,
});

export const addWishlist = (productId, accessToken) => {
  console.log(productId, accessToken);
  return async dispatch => {
    await axios
      .post(
        `${URL}buyer/wishlist`,
        {
          product_id: productId,
        },
        {
          headers: {
            access_token: `${accessToken}`,
          },
        },
      )
      .then(res => {
        console.log(res.data);
        Toast.show({
          type: 'success',
          text1: 'Successful Add to Wishlist!',
        });
        dispatch({
          type: ADD_WISHLIST,
          payload: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const DaftarJualScreen = data => ({
  type: DAFTARJUAL_SCREEN,
  payload: data,
});

export const NotificationScreen = data => ({
  type: NOTIFICATION_SCREEN,
  payload: data,
});

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
        console.log(error);
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
        console.log(error);
      });
  };
};

export const getWishlistSeller = AccessToken => {
  return async dispatch => {
    await axios
      .get(URL + 'seller/order?status=', {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_WISHLIST_SELLER,
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
export const rupiah = number => {
  let reverse = number.toString().split('').reverse().join(''),
    thousand = reverse.match(/\d{1,3}/g);
  thousand = thousand.join('.').split('').reverse().join('');
  return thousand;
};

export const timeDate = date => {
  const tDate = moment(date).format('Do MMMM hh:mm');
  return tDate;
};

export const getNotificationSeller = AccessToken => {
  return async dispatch => {
    await axios
      .get(URL + 'notification?notification_type=seller', {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_NOTIFICATION_SELLER,
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getNotificationBuyer = AccessToken => {
  return async dispatch => {
    await axios
      .get(URL + 'notification?notification_type=buyer', {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_NOTIFICATION_BUYER,
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getCategory = () => {
  return async dispatch => {
    await axios
      .get(URL + 'seller/category')
      .then(res => {
        dispatch({
          type: GET_CATEGORY,
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getSpesificProduct = (AccessToken, id) => {
  return async dispatch => {
    await axios
      .get(URL + 'seller/product/' + id, {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_SPESIFIC_PRODUCT,
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const deleteProduct = (AccessToken, id) => {
  return async dispatch => {
    await axios
      .delete(URL + 'seller/product/' + id, {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Success Delete Product!',
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const updateProduct = (data, AccessToken, category, id) => {
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
      .put(URL + 'seller/product/' + id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Success Update Product!',
        });
      })
      .catch(function (error) {
        console.log(error);
        console.log(error);
      });
  };
};

export const acceptOrder = (AccessToken, id) => {
  return async dispatch => {
    await axios
      .patch(
        URL + 'seller/order/' + id,
        {
          status: '',
        },
        {
          headers: {
            access_token: `${AccessToken}`,
          },
        },
      )
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Success Accept Order!',
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const SoldOrder = (AccessToken, id) => {
  return async dispatch => {
    await axios
      .patch(
        URL + 'seller/order/' + id,
        {
          status: 'accepted',
        },
        {
          headers: {
            access_token: `${AccessToken}`,
          },
        },
      )
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Success Sold Order!',
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const declineOrder = (AccessToken, id) => {
  return async dispatch => {
    await axios
      .patch(
        URL + 'seller/order/' + id,
        {
          status: 'declined',
        },
        {
          headers: {
            access_token: `${AccessToken}`,
          },
        },
      )
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Success Decline Order!',
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getWishlistSpesific = (AccessToken, id) => {
  return async dispatch => {
    await axios
      .get(URL + 'seller/order/' + id, {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_WISHLIST_SPESIFIC,
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getSpesificProductBuyer = (AccessToken, id) => {
  return async dispatch => {
    await axios
      .get(URL + 'buyer/product/' + id, {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_SPESIFIC_PRODUCT_BUYER,
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const buyProduct = (data, AccessToken) => {
  return async dispatch => {
    const {base_price, id} = data;
    await axios
      .post(
        URL + 'buyer/order',
        {
          product_id: id,
          bid_price: base_price,
        },
        {
          headers: {
            access_token: `${AccessToken}`,
          },
        },
      )
      .then(res => {
        console.log('res order actions: ', res.data);
        dispatch({
          type: GET_ORDER,
          payload: res.data,
        });
        Toast.show({
          type: 'success',
          text1: 'Your bid price has been successfully sent to the seller!',
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getStatusOrder = AccessToken => {
  return async dispatch => {
    await axios
      .get(URL + 'buyer/order/', {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_STATUS_ORDER,
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getStatusOrderProduct = (AccessToken, id) => {
  return async dispatch => {
    await axios
      .get(URL + 'buyer/order/' + id, {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_STATUS_ORDER_PRODUCT,
          payload: res.data,
        });
        // Toast.show({
        //   type: 'success',
        //   text1: 'You already ordered this product',
        // });
      })
      .catch(function (error) {
        dispatch({
          type: GET_STATUS_ORDER_PRODUCT,
          payload: null,
        });
      });
  };
};

export const getDetailNotification = (AccessToken, id) => {
  return async dispatch => {
    await axios
      .get(URL + 'notification/' + id, {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_DETAIL_NOTIFICATION,
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const readNotif = (AccessToken, id) => {
  return async dispatch => {
    await axios
      .patch(
        URL + 'notification/' + id,
        {},
        {
          headers: {
            access_token: `${AccessToken}`,
          },
        },
      )
      .then(res => {
        console.log('patch read sucess!');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getSoldSeller = AccessToken => {
  return async dispatch => {
    await axios
      .get(URL + 'seller/order?status=accepted', {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_SOLD_SELLER,
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const connectionChecker = () => {
  return async dispatch => {
    try {
      NetInfo.addEventListener(state => {
        if (state.isConnected) {
          dispatch({
            type: CONNECTED,
          });
        } else {
          dispatch({
            type: NOT_CONNECTED,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};
