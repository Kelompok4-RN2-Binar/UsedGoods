import {
  AUTH_SCREEN,
  FETCH_LOGIN,
  GET_USER_DATA,
  UPDATE_USER_DATA,
  LOGOUT,
  GET_PRODUCT_SELLER,
  DAFTARJUAL_SCREEN
} from '../types';
const initialState = {
  authScreen: 'Login',
  loginUser: null,
  userData: null,
  productDataSeller:null,
  daftarJualScreen:'Product'
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
    case GET_PRODUCT_SELLER:
      return {
        ...state,
        productDataSeller: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
