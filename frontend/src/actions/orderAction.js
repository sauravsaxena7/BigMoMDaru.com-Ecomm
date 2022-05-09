import axios from "axios";
import { CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MYORDER_ORDER_FAIL, MYORDER_ORDER_REQUEST, MYORDER_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS,

    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,UPDATE_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    ALL_ORDER_REQUEST,ALL_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,DELETE_ORDER_SUCCESS,
} from "../constants/orderConstant";

let token;
let config;

const  callMe =() =>{
    token=localStorage.getItem("token");
    config = {
        headers:
        {
            "Content-Type":"application/json",
            "Authorization" : `${token}`,
        }
    };
}


export const createOrder = (order) => async(dispatch,getState) =>{



    try{

        callMe();

        dispatch({type:CREATE_ORDER_REQUEST});

       

        const { data } = await axios.post("http://localhost:4000/api/v1/order/new",order,config);

        dispatch({type:CREATE_ORDER_SUCCESS,payload:data});



    }catch(error){

        console.log(error.response.data.error);
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.error,

        })

    }    
 

};



export const myOrders = () => async(dispatch,getState) =>{

    try{

        callMe();

        dispatch({type:MYORDER_ORDER_REQUEST});

        

    

       
        const { data } = await axios.get("http://localhost:4000/api/v1/orders/me",config);

        dispatch({type:MYORDER_ORDER_SUCCESS,payload:data.order});



    }catch(error){

        console.log(error.response.data.error);
        dispatch({
            type:MYORDER_ORDER_FAIL,
            payload:error.response.data.error,

        })

    }    
 

};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        callMe();
      dispatch({ type: ORDER_DETAILS_REQUEST });

    
      const { data } = await axios.get(`http://localhost:4000/api/v1/order/${id}`,config);
      console.log("sauiiii",data.order);

  
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });

    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };



  
export const getAllOrders = () => async(dispatch,getState) =>{

    try{

        callMe();

        dispatch({type:ALL_ORDER_REQUEST});

        

    

       
        const { data } = await axios.get("http://localhost:4000/api/v1/admin/orders",config);

        dispatch({type:ALL_ORDER_SUCCESS,payload:data.orders});



    }catch(error){

        console.log(error.response.data.error);
        dispatch({
            type:ALL_ORDER_FAIL,
            payload:error.response.data.error,

        })

    }    
 

};





export const updateOrder = (id,order) => async(dispatch,getState) =>{



    try{

        callMe();

        dispatch({type:UPDATE_ORDER_REQUEST});

       

        const { data } = await axios.put(`http://localhost:4000/api/v1/admin/order/${id}`,order,config);

        dispatch({type:UPDATE_ORDER_SUCCESS,payload:data.success});



    }catch(error){

        console.log(error.response.data.error);
        dispatch({
            type:UPDATE_ORDER_FAIL,
            payload:error.response.data.error,

        })

    }    
 

};


export const deleteOrder = (id) => async(dispatch,getState) =>{



    try{

        callMe();

        dispatch({type:DELETE_ORDER_REQUEST});

       

        const { data } = await axios.delete(`http://localhost:4000/api/v1/admin/order/${id}`,config);

        dispatch({type:DELETE_ORDER_SUCCESS,payload:data.success});



    }catch(error){

        console.log(error.response.data.error);
        dispatch({
            type:DELETE_ORDER_FAIL,
            payload:error.response.data.error,

        })

    }    
 

};


// Clearing Errors
export const clearErrors= () => async (dispatch)=>{

    dispatch({type:CLEAR_ERRORS});

}   