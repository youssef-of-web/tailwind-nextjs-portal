import axios from 'axios'
import { GET_ERRORS_AUTH, SET_CURRENT_USER } from '../types';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from "jwt-decode";

export const RegisterAction = (form, router) => (dispatch)=>{
   
    axios
     .post("/api/users/register", form)
     .then(res => {
         router.push('/auth/login')
         dispatch({
            type: GET_ERRORS_AUTH,
            payload: {}
        })
     })
     .catch(err => dispatch({
             type: GET_ERRORS_AUTH,
             payload: err.response.data
         })
     );
}

export const LoginAction = (form, router) => (dispatch)=>{
    axios
     .post("/api/users/login", form)
     .then(res => {
         router.push('/admin/settings')
         //get token
        const { token } = res.data;
        //set to local storage
        window.localStorage.setItem("jwtToken", token);
        //set auth toekn if exist
        setAuthToken(token);
        //decode token
        const decoded = jwt_decode(token);
        //set current user
        dispatch({
            type: GET_ERRORS_AUTH,
            payload: {}
        })
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded,
        })
     })
     .catch(err => {
         dispatch({
             type: GET_ERRORS_AUTH,
             payload: err.response.data
         })
     });
}
export const LogoutUser = () => (dispatch) => {

    window.location.href = "/";
    window.localStorage.removeItem("jwtToken");
  
  setAuthToken(false);

  dispatch(set_current_user({}));
};

export const set_current_user = (data) => ({
    type: SET_CURRENT_USER,
    payload: data,
});
  