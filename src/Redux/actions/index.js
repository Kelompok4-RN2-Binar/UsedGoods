import axios from "axios";
import { FETCH_LOGIN } from "../types";
import { URL } from "../../Utils/Url";
  
export const fetchingLogin = (email,pass)=> {
    return async(dispatch) => { 
        await axios.post(URL+'auth/login',{
            "email" : email,
            "password":pass
        }).then(res => {
                console.log("User Info : ",res.data)
                dispatch({
                    type :FETCH_LOGIN,
                    isLogin:true,
                    data:res.data, 
                    token:res.data.access_token
                });
        }).catch(function (error) {
            if(error.response.status==401){
                alert("Email or Password Missmatch! Please Input an a Correct Email & Password")
            }else if(error.response.status==400){
                alert("Fill Username or password")
            }else{
                alert(error)
            }  
        }) 
    };
}  

export const fetchingRegister = (name,email,pass,phone,address,city)=> {
    return async(dispatch) => { 
        await axios.post(URL+'auth/register',{
            "full_name" : name,
            "email" : email,
            "password":pass,
            "phone_number" : phone,
            "address":address,
            "image" : "",
            "city" : city
        }).then(res => {
            console.log("User Info : ",res.data)
        }).catch(function (error) {
                alert(error.message)
        }) 
    };
}  

export const goLogout = () => {
    return async(dispatch)  => { 
        dispatch({
            type :FETCH_LOGIN,
            isLogin:false,
            data : [],
            token:null
        })
    };
}  