import {
  AUTH_SCREEN,
  FETCH_LOGIN,
  GET_USER_DATA,
  UPDATE_USER_DATA,
  LOGOUT,
} from '../types';
const initialState = {
  authScreen: 'Login',
  loginUser: null,
  userData: null,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SCREEN:
      return {
        ...state,
        authScreen: action.payload,
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
    default:
      return state;
  }
};

export default Reducer;
