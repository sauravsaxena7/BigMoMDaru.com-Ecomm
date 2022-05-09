
import axios from "axios";

//saursav
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    
    CLEAR_ERRORS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,


    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,

    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    
} from "../constants/productConstant";



let config;

const  callMe =() =>{
    const token=localStorage.getItem("token");
    config = {
        headers:
        {
            "Content-Type":"application/json",
            "Authorization" : `${token}`,
        }
    };
}



export const getProduct= (keyword="",currentPage=1,price=[0,25000],category,ratings=0) => async (dispatch)=>{
    try{

        dispatch({
            type:ALL_PRODUCT_REQUEST
        });


       

        let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if (category) {
          link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        

        const { data } = await axios.get(link);


        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        });

    }catch(error){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.error,
        });
    }
};



export const getProductDetails= (id) => async (dispatch)=>{
    
    try{
        

        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        });



        const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`);


        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product,
        });

    }catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.error,
        });
    }
};


// //new Review

export const newReview= (reviewData) => async (dispatch)=>{
    try{

        callMe();
        

        dispatch({
            type:NEW_REVIEW_REQUEST
        });

       

        const { data } = await axios.put(`http://localhost:4000/api/v1/review`,reviewData,config);

        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload:data.success,
        });

    }catch(error){
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload:error.response.data.error,
        });
    }
};





export const createProduct= (productData) => async (dispatch)=>{
    try{

    const token2=localStorage.getItem("token");
    config = {
        headers:
        {
            "Content-Type":"multipart/form-data",
            "Authorization" : `${token2}`,
        }
    };
        

        dispatch({
            type:NEW_PRODUCT_REQUEST
        });

       

        const { data } = await axios.post(`http://localhost:4000/api/v1/admin/product/new`,productData,config);

        dispatch({
            type:NEW_PRODUCT_SUCCESS,
            payload:data,
        });

    }catch(error){
        dispatch({
            type:NEW_PRODUCT_FAIL,
            payload:error.response.data.error,
        });
    }
};






export const getAdminProducts=()=>async (dispatch)=>{

    try {
        callMe();
        

        dispatch({type:ADMIN_PRODUCT_REQUEST});

        const {data}  = await axios.get(`http://localhost:4000/api/v1/admin/products`,config);

        dispatch({
            type:ADMIN_PRODUCT_SUCCESS,
            payload:data,
        });


    }catch(error){

        dispatch({
            type:ADMIN_PRODUCT_FAIL,
            payload:error.response.data.error,
        });

    }



};



export const deleteProduct = (id) => async (dispatch)=>{
    try{

        callMe();
        

        dispatch({
            type:DELETE_PRODUCT_REQUEST
        });

       

        const { data } = await axios.delete(`http://localhost:4000/api/v1/admin/product/${id}`,config);

        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload:data.success,
        });  

    }catch(error){
        dispatch({
            type:DELETE_PRODUCT_FAIL,
            payload:error.response.data.error,
        });
    }
};








export const updateProduct= (id,productData) => async (dispatch)=>{
    try{

    const token2=localStorage.getItem("token");
    config = {
        headers:
        {
            "Content-Type":"multipart/form-data",
            "Authorization" : `${token2}`,
        }
    };
        

        dispatch({
            type:UPDATE_PRODUCT_REQUEST
        });

       

        const { data } = await axios.put(`http://localhost:4000/api/v1/admin/product/${id}`,productData,config);

        dispatch({
            type:UPDATE_PRODUCT_SUCCESS,
            payload:data.success,
        });

    }catch(error){
        dispatch({
            type:UPDATE_PRODUCT_FAIL,
            payload:error.response.data.error,
        });
    }
};



// //new Review

export const getAllReviews= (id) => async (dispatch)=>{
    try{

        callMe();
        

        dispatch({
            type:ALL_REVIEW_REQUEST
        });

       

        const { data } = await axios.get(`http://localhost:4000/api/v1/reviews?productId=${id}`,config);

        dispatch({
            type:ALL_REVIEW_SUCCESS,
            payload:data.reviews,
        });

    }catch(error){
        dispatch({
            type:ALL_REVIEW_FAIL,
            payload:error.response.data.error,
        });
    }
};



export const deleteReviews= (reviewId,productId) => async (dispatch)=>{
    try{

        callMe();
        

        dispatch({
            type:DELETE_REVIEW_REQUEST
        });

       

        const { data } = await axios.delete(`http://localhost:4000/api/v1/reviews?id=${reviewId}&productId=${productId}`,config);

        dispatch({
            type:DELETE_REVIEW_SUCCESS,
            payload:data.success,
        });

    }catch(error){
        dispatch({
            type:DELETE_REVIEW_FAIL,
            payload:error.response.data.error,
        });
    }
};









// Clearing Errors
export const clearErrors= () => async (dispatch)=>{

    dispatch({type:CLEAR_ERRORS});

}    