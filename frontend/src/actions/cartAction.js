

import { ADD_TO_CART, REMOVE_CART_ITEMS, SAVE_SHIPPING_INFO } from "../constants/cartConstant";

import axios from "axios";



//add items to cart
export const addItemsToCart= (id,quantity) => async(dispatch,getState) => {


        const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`);

            dispatch(
                { 
                    type: ADD_TO_CART, 
                    payload: {
                        product:data.product._id,
                        name:data.product.name,
                        price:data.product.price,
                        image:data.product.images[0].url,
                        stock:data.product.stock,
                        quantity,
                    },
                
                });



                localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))

 };


 //Remove Items To cart

 export const removeItemsFromCart = (id) => async(dispatch,getState) => {

    dispatch({
        type:REMOVE_CART_ITEMS,
        payload:id,
    });

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
    

 };

 //save shipping info

 export const saveShippingInfo = (data) => async(dispatch) =>{


    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data,
    });

    localStorage.setItem("shippingInfo",JSON.stringify(data));
 };


