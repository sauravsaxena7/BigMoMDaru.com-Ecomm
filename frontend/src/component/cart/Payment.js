

import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";


import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction.js";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Payment = () =>{

  localStorage.setItem("refresh",false);


    const navigate = useNavigate();

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const payBtn = useRef(null);

    const stripe = useStripe();

    const dispatch = useDispatch();

    const elements = useElements();



    const {shippingInfo,cartItems} = useSelector((state)=>state.cart);

    const {user} =useSelector((state)=>state.user);

    const {error} = useSelector((state)=>state.newOrder);

    const paymentData = {
      
      amount:Math.round(orderInfo.totalPrice*100),
    };

   
    const order = {
      shippingInfo,
      orderItems:cartItems,
      itemsPrice:orderInfo.subtotal,
      taxPrice:orderInfo.tax,
      shippingPrice:orderInfo.shippingCharges,
      totalPrice:orderInfo.totalPrice,



    }



    const submitHandler = async (e) =>{

      e.preventDefault();
      payBtn.current.disabled = true;

      try{
          const token = localStorage.getItem("token");

        const config ={
          headers:
          {
              "Content-Type":"application/json",
              "Authorization" : `${token}`,
            },
        };

        const {data} = await axios.post(

          "http://localhost:4000/api/v1/payment/process",
          paymentData,
          config

        );

        const client_secret = data.client_secret;
        

        if(!stripe || !elements) return;

        const result = await stripe.confirmCardPayment(client_secret,{

          payment_method:{
            card:elements.getElement(CardNumberElement),
            billing_details:{
              name:user.User.name,
              email:user.User.email,
              address:{
                line1:shippingInfo.address,
                city:shippingInfo.city,
                state:shippingInfo.state,
                postal_code:shippingInfo.pinCode,
                country:shippingInfo.country,
              },
            },
          },

        });

        if(result.error){

          payBtn.current.disabled=false;
          toast.error(result.error.message);

        }else{
          if(result.paymentIntent.status === "succeeded"){

            order.paymentInfo={
              id:result.paymentIntent.id,
              status:result.paymentIntent.status


            };

            dispatch(createOrder(order));
            navigate("/order/success")
          }else{
            toast.error("There's some issue while processing payment");
          }
        }


      }catch(error){
        payBtn.current.disabled=false;
      }
    }

    useEffect(()=>{
      if(error){
        toast.error(error);

        dispatch(clearErrors());
      }
    })



    return (
        <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeSteps={2} />
      <div className="paymentContainer">
      <p className="rp">Please use this 4000 0027 6000 3184 as card number and rest According to your valid choice </p>
      <p>It is only for testing purpose</p>
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>

      <ToastContainer
            position="bottom-center"
            theme="dark"
            draggable={false}
            />
    </Fragment>
    )

};

export default Payment;

