import { 
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    REGISTER_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    ALL_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    

 } from "../constants/userConstants";

 import axios from "axios";

//login
 export const login = (email,password) => async(dispatch) => {

    try{

        dispatch({type:LOGIN_REQUEST});

        const config = { headers: {"Content-Type":"application/json"}};




        const { data } = await axios.post(
            `/api/v1/login`,
            {email,password},
            config
     
            );

          localStorage.setItem("token",data.token);




            dispatch({ type: LOGIN_SUCCESS, payload: data });




    }catch(error){

        
        dispatch({type:LOGIN_FAIL,payload:error.response.data.error});

    }

 }



//register
 export const register = (userData) => async(dispatch) => {

    try{

        dispatch({type:REGISTER_USER_REQUEST});

        const config = { headers: {"Content-Type":"multipart/form-data"}};



        const { data } = await axios.post(
            `/api/v1/register`,
            userData,
            config
     
            );

            localStorage.setItem("token",data.token);

            

            dispatch({ type: REGISTER_USER_SUCCESS, payload: data });




    }catch(error){

        console.log(error.response.data.error);

        dispatch({type:REGISTER_USER_FAIL,payload:error.response.data.error});

    }

 }



 //LoadUser

 export const loadUser = () => async(dispatch) => {

    

    try{
        
        dispatch({type:LOAD_USER_REQUEST});

        const token = localStorage.getItem("token");

       

        


        const { data } = await axios.get(`/api/v1/me`,{ 
            headers: {
                "Authorization" : `${token}`,
                'Content-Type': 'application/json'
                }
            });

            

            dispatch({ type: LOAD_USER_SUCCESS, payload: data });




    }catch(error){

        // console.log(error.response.data.error,"0000");
        let ms="";
        if(!error.response.data.error){
            ms="Invalid Token";
        }else{
            ms=error.response.data.error;
        }

        dispatch({type:LOAD_USER_FAIL,payload:ms});

    }

 }


//logoutuser
 export const logout = () => async(dispatch) => {

    try{

        localStorage.clear();

        
        


        await axios.get(`/api/v1/logout`);

        

            

            dispatch({ type: LOGOUT_SUCCESS });




    }catch(error){

       

        dispatch({type:LOGOUT_FAIL,payload:error.response.data.error});

    }

 };

 //updateProfile


 export const updateProfile= (userData) => async(dispatch) => {

    try{
        const token = localStorage.getItem("token");

        dispatch({type:UPDATE_PROFILE_REQUEST});

        const config = { 
            headers: 
            {
                "Content-Type":"multipart/form-data",
                 "Authorization" : `${token}`,
                
                   
            }
        };



        const { data } = await axios.put(
            `/api/v1/me/update`,
            userData,
            config
     
            );


            dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });




    }catch(error){

        console.log(error.response.data.error);

        dispatch({type:UPDATE_PROFILE_FAIL,payload:error.response.data.error});

    }

 };


//update Password
 export const updatePassword= (password) => async(dispatch) => {

    try{
        const token = localStorage.getItem("token");

        dispatch({type:UPDATE_PASSWORD_REQUEST});

        const config = {
             headers: 
             {
                 "Content-Type":"application/json",
                 "Authorization" : `${token}`,
                 
            }
        };



        const { data } = await axios.put(
            `/api/v1/password/update`,
            password,
            config
     
            );


            dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });




    }catch(error){

        console.log(error.response.data.error);

        dispatch({type:UPDATE_PASSWORD_FAIL,payload:error.response.data.error});

    }

 };



 //forgotPassword


 export const forgotPassword = (email) => async(dispatch) => {

    try{

        dispatch({type:FORGOT_PASSWORD_REQUEST});

        const config = { headers: {"Content-Type":"application/json"}};




        const { data } = await axios.post(
            `/api/v1/password/forgot`,
            email,
            config
     
            );

           



            dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });




    }catch(error){

        console.log(error.response.data.error);
        dispatch({type:FORGOT_PASSWORD_FAIL,payload:error.response.data.error});

    }


 }



 export const resetPassword = (token,passwords) => async(dispatch) => {

    try{

        dispatch({type:RESET_PASSWORD_REQUEST});

        const config = { headers: {"Content-Type":"application/json"}};




        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            config
     
            );

           



            dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });




    }catch(error){

        
        dispatch({type:RESET_PASSWORD_FAIL,payload:error.response.data.error});

    }


 };



 export const getAllUsers = () => async(dispatch) => {

    try{

        dispatch({type:ALL_USER_REQUEST})

        const token = localStorage.getItem("token");


        const config = {

            headers:
            {
                "Content-Type":"application/json",
                "Authorization" : `${token}`,
            }


        };

        const {data} = await axios.get(`/api/v1/admin/users`,config);



        dispatch({ type: ALL_USER_SUCCESS,
            payload:data.Users });




    }catch(error){

       

        dispatch({type:ALL_USER_FAIL,payload:error.response.data.error});

    }

 };





 export const updateUser= (id,userData) => async(dispatch) => {

    try{
        const token = localStorage.getItem("token");

        dispatch({type:UPDATE_USER_REQUEST});

        const config = { 
            headers: 
            {
                "Content-Type":"application/json",
                 "Authorization" : `${token}`,
                
                   
            }
        };



        const { data } = await axios.put(
            `/api/v1/admin/user/${id}`,
            userData,
            config
     
            );


            dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });




    }catch(error){

        console.log(error.response.data.error);

        dispatch({type:UPDATE_USER_FAIL,payload:error.response.data.error});

    }

 };




 export const deleteUser= (id) => async(dispatch) => {

    try{
        const token = localStorage.getItem("token");

        dispatch({type:DELETE_USER_REQUEST});

        const config = { 
            headers: 
            {
                "Content-Type":"application/json",
                 "Authorization" : `${token}`,
                
                   
            }
        };



        const { data } = await axios.delete(
            `/api/v1/admin/user/${id}`,
            config
     
            );


            dispatch({ type: DELETE_USER_SUCCESS, payload: data.success });




    }catch(error){

        console.log(error.response.data.error);

        dispatch({type:DELETE_USER_FAIL,payload:error.response.data.error});

    }

 };



 export const getUserDetails = (id) => async(dispatch) => {
    

    try{
        
        dispatch({type:USER_DETAILS_REQUEST});

        const token = localStorage.getItem("token");

       

        


        const { data } = await axios.get(`/api/v1/admin/user/${id}`,{ 
            headers: {
                "Authorization" : `${token}`,
                'Content-Type': 'application/json'
                }
            });

            

            dispatch({ type: USER_DETAILS_SUCCESS, payload:data.User});




    }catch(error){

        

        dispatch({type:USER_DETAILS_FAIL,payload:error.response.data.error});

    }

 }



 // Clearing Errors
export const clearErrors= () => async (dispatch)=>{

    dispatch({type:CLEAR_ERRORS});

}    
