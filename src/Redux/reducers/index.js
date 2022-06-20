import { FETCH_LOGIN } from "../types";
const initialState= {
    data:{},
    isLogin:false,
    token:null
};


const Reducer = (state = initialState,action) => {
    switch(action.type){
            case FETCH_LOGIN:
            return{
                ...state,
                data:action.data,
                isLogin:action.isLogin,
                token:action.token
            };  
            default:
                return state;
    }
};

export default Reducer

