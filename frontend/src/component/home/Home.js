import React ,{ Fragment, useEffect } from "react";

// import { CgMouse } from "react-icons/all";

import "./Home.css"


import MetaData from "../layout/MetaData"

import { clearErrors, getProduct } from "../../actions/productAction";

import {useSelector,useDispatch}  from "react-redux";

import Loader from "../loader/loader"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import ProductCard from "./ProductCard";

import BackgroundSlider from 'react-background-slider';

import whisky from "../../images/whisky.jpg";
import redWine from "../../images/redWinee.jpg";

import Wine from "../../images/wine.jpg";

import Brandy from "../../images/brandy.jpg"












// const product = {
//     name:"Blue Tshirt",
//     price:"₹3000",
//     _id:"saurav",
//     images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],

    
// }



const Home = () =>{

    localStorage.setItem("refresh",false);



    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(
        (state) => state.products
    );


    useEffect(()=>{


        if(error){

           toast.error(error);
           dispatch(clearErrors());
           

        }
        
        dispatch(getProduct());

    },[dispatch,error]);


    return (

        <Fragment>

            {loading ? (

               <Loader/>
              

            ):(

                <Fragment>

                <MetaData title="BigMoMDaru.com"/>

                <BackgroundSlider
                     images={[whisky,redWine,Wine,Brandy]}
                     //images={[redWine]}

                     duration={10} transition={2} />


                <div className="banner">
                   <p>MAKE YOUR OWN CHOICE'S</p>
                   <h1>FIND AMAZING LIQUIOR & BEER BELOW</h1>
                   <a href="#container">
                       <button>
                           Scroll 
                           
                       </button>
                    </a>
        
                    
        
        
               </div>     
        
                    
        
               <h2 className="homeHeading">BEST LIQUIOR</h2>



        
               <div className="container"  id="container">
                   {products && products.map((product,i) => <ProductCard key={i} product={product}/>)}
        
                   
        
               </div>
        
        
        
              
        
        
            </Fragment>
            )}

            <ToastContainer
            position="bottom-center"
            theme="dark"
            draggable={false}
            />


        </Fragment>



   
    );
}

export default Home;