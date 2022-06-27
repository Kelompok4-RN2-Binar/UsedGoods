import {AUTH_SCREEN, FETCH_LOGIN} from '../types';
const initialState = {
  authScreen: 'Login',
  data: {},
  isLogin: false,
  token: null,
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
        data: action.data,
        isLogin: action.isLogin,
        token: action.token,
      };
    default:
      return state;
  }
};

export default Reducer;
