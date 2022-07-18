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
  GET_NOTIFICATION_SELLER,
  GET_NOTIFICATION_BUYER,
  NOTIFICATION_SCREEN,
  GET_CATEGORY,
  GET_SPESIFIC_PRODUCT,
  GET_WISHLIST_SPESIFIC,
  STATUS_PRODUCT
} from '../types';
const initialState = {
  authScreen: 'Login',
  loginUser: null,
  userData: null,
  wishlistDataSeller:null,
  banner: null,
  product: null,
  productDataSeller: null,
  daftarJualScreen: 'Product',
  notifDataSeller:null,
  notifDataBuyer:null,
  notifScreen:'Seller',
  category:null,
  productSpesific:null,
  wishlistSpesific:null,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SCREEN:
      return {
        ...state,
        authScreen: action.payload,
      };
    case DAFTARJUAL_SCREEN:
      return {
        ...state,
        daftarJualScreen: action.payload,
      };
    case NOTIFICATION_SCREEN:
    return {
      ...state,
      notifScreen: action.payload,
    };
    case FETCH_LOGIN:
      return {
        ...state,
        loginUser: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        loginUser: null,
        userData: null,
      };
    case GET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case GET_BANNER:
      return {
        ...state,
        banner: action.payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case GET_PRODUCT_SELLER:
      return {
        ...state,
        productDataSeller: action.payload,
      };
    case GET_WISHLIST_SELLER:
      return {
        ...state,
        wishlistDataSeller: action.payload,
      };
    case GET_NOTIFICATION_SELLER:
      return {
        ...state,
        notifDataSeller: action.payload,
      };
    case GET_NOTIFICATION_BUYER:
      return {
        ...state,
        notifDataBuyer: action.payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case GET_SPESIFIC_PRODUCT:
      return {
        ...state,
        productSpesific: action.payload,
      };
    case GET_WISHLIST_SPESIFIC:
      return {
        ...state,
        wishlistSpesific: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
