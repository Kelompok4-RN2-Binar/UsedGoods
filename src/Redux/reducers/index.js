import { FETCH_LOGIN } from "../types";
const initialState= {
    data:null,
};


const Reducer = (state = initialState,action) => {
    switch(action.type){
            case FETCH_LOGIN:
            return{
                ...state,
                data:action.data,
            };
        
            default:
                return state;
    }
};

export default Reducer

