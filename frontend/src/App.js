import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from "./component/layout/header/Header.js"
import Footer from "./component/layout/footer/Footer"
import Home from "./component/home/Home.js"

import webfont from "webfontloader";
import { useEffect, useState } from 'react';
import ProductDetails from './component/product/ProductDetails.js';
import Products from "./component/product/Products.js"
import Search from "./component/product/Search.js"

import LoginSignUp from './component/User/LoginSignUp';

import store from "./Store";
import { clearErrors, loadUser } from './actions/userActions';

import Profile from "./component/User/Profile.js";

import ProtedtedRoute from "./component/protectedRoute/ProtectedRoute";

import UpdateProfile from "./component/User/UpdateProfile.js";

import UpdatePassword from "./component/User/UpdatePassword.js";

import ForgotPassword from "./component/User/ForgotPassword.js";

import ResetPassword from "./component/User/ResetPassword.js";

import Cart from "./component/cart/Cart.js";

import Shipping from "./component/cart/Shipping.js";

import ConfirmOrder from "./component/cart/ConfirmOrder.js";

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { Elements } from "@stripe/react-stripe-js";

import {loadStripe} from "@stripe/stripe-js";

import Payment from "./component/cart/Payment.js";

import OrderSuccess from "./component/cart/OrderSuccess.js";

import MyOrders from "./component/orders/MyOrders.js"

import OrderDetails from "./component/orders/OrderDetails.js";

import DashBoard from "./component/admin/DashBoard.js";

import ProductsList from "./component/admin/ProductsList.js";
import NewProduct from './component/admin/NewProduct';

import UpdateProduct from './component/admin/UpdateProduct.js';

import AdminOrders from './component/admin/AdminOrders.js';


import ProcessOrder from './component/admin/ProcessOrder.js';

import UserList from "./component/admin/UserList.js";

import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReview from './component/admin/ProductReview';

import About from "./component/about/About";
//import Contact from "./component/about/contact";


import NotFound from './component/layout/notFound/NotFound';

import UserOptions from './component/layout/header/UserOptions';







// 4000 0027 6000 3184

//first you have to download file mongodb dev tools the apply it
//>mongoimport --jsonArray --uri mongodb+srv://saurav__s7:Saurav121@bigmomdaru.iykxf.mongodb.net/BigMomDaru --collection users --type json --file users.json


//netstat -ano | findstr :3000
//tskill typeyourPIDhere 


function App() {
  

  const dispatch = useDispatch();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));


  

  const { isAuthenticated ,error,role,user}  = useSelector((State)=>State.user);

 

  const [stripeApiKey,setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const token=localStorage.getItem("token");
    const config = { 
      headers: 
      {
          "Content-Type":"application/json",
           "Authorization" : `${token}`,
          
             
      }
  };

    const {data} = await axios.get("/api/v1/stripeapikey",config);

    setStripeApiKey(data.stripeApiKey);
  }

  


  



   
    
       
  
  
  useEffect(()=>{

    webfont.load({
        google:{
            families:["Roboto","Droid Sans","Chilkana"]
        },
    });

    

    

   
    
      if(error){

        dispatch(clearErrors())

      }
      store.dispatch(loadUser());
      dispatch(clearErrors());
      

        getStripeApiKey();

      
     
      
      
      
      

     
      

},[])


  return (

    <Router>
       <Header/>

       {isAuthenticated && <UserOptions user={user} />}
       <Routes>
         <Route path="/" element={<Home />}></Route>
         <Route path="/product/:id" element={ <ProductDetails/> } />
         <Route path="/products" element = {<Products/>} />
         <Route path="/products/:keyword" element = {<Products/>} />
         <Route  path="/search" element = {<Search/>} />

         <Route path="/login" element = {<LoginSignUp/>} />

         
         {isAuthenticated && (
         <Route element={<ProtedtedRoute isAuthenticated={isAuthenticated}/>}>
           
           <Route path="/me/update" element={<UpdateProfile/>}/>
           <Route path="/password/forgot" element={<ForgotPassword/>}/>
           <Route path="/password/reset/:token" element={<ResetPassword/>}/>
           <Route path="/shipping" element={<Shipping/>} />
           <Route path="/order/confirm" element={<ConfirmOrder/>} />
           {stripeApiKey && (
           <Route path="/process/payment" element = {<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>}/>
           )}
           <Route path="/order/success" element={<OrderSuccess/>} />
           <Route path='/orders' element={<MyOrders/>}/>
           <Route path='/order/:id' element={<OrderDetails/>}/>

           {/* <Route  path="/admin/dashboard" element={<DashBoard/>}/> */}
        </Route>

         )}
         <Route element={<ProtedtedRoute isAuthenticated={isAuthenticated}/>}>
           
           <Route path="/account" element = {<Profile/>} />

         </Route>




        {role && (
          <Route element={<ProtedtedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={role}/>}>

            <Route path="/admin/dashboard" element={<DashBoard/>}/>
            <Route path="/admin/products" element={<ProductsList/>}/>

            <Route path="/admin/product/new" element={<NewProduct/>}/>

            <Route path="/admin/product/:id" element={<UpdateProduct/>}/>

            <Route path="/admin/orders" element={<AdminOrders/>}/>

            <Route path="/admin/order/:id" element={<ProcessOrder/>}/>

            <Route path="/admin/users" element={<UserList/>}/>


            <Route path="/admin/user/:id" element={<UpdateUser/>}/>

            <Route path='admin/reviews' element={<ProductReview/>}/>


          </Route>

            

        )}

         <Route path="/password/update" element={<ProtedtedRoute isAuthenticated={isAuthenticated}><UpdatePassword/></ProtedtedRoute>}/>


         

        





         <Route path="/cart" element = {<Cart/>} />

         <Route path='/about' element={<About/>}/>
         {/* <Route path='/contact' element={<Contact/>}/> */}



         


         <Route path='*' element={window.location.pathname === "/process/payment" ? null : <NotFound/>}/>


       </Routes>




       <Footer/>



    </Router>
  
  );
}

export default App;



