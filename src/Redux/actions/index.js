import axios from "axios";
import { FETCH_LOGIN } from "../types";
import { URL } from "../../Utils/Url";
  
export function fetchingLogin(email,pass) {
    return function(dispatch) {
        return axios.post(URL+'auth/login',{
            "email" : email,
            "password":pass
        }).then(res => {
            if(res.message!="email or password are wrong"){
                console.log("User Info : ",res)
                dispatch({
                    type :FETCH_LOGIN,
                    data:res,
                });
            }else{
                console.log("error")
            }
        }).catch( e =>{
            console.log(e)
        });
    };
}  