import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";

import "./Products.css"

import Loader from "../loader/loader"
import ProductCard from "../home/ProductCard";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";

import Pagination from "react-js-pagination"

import Slider from "@material-ui/core/Slider";

import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData"



const categories = [
    "wine",
    "Rum",
    "Red Wines",
    "Whiskey",
    "Beer",

];








const Products = () =>{


    
    const dispatch = useDispatch();

    const {keyword} = useParams();

    const [currentPage,setCurrentPage] = useState(1);

    const [price,setPrice ] = useState([0,25000]);



    

    const {products ,loading,error,productsCount,resultPerPage,filteredProductsCount} = useSelector((state)=>state.products);


    const setCurrentPageNo = (e)=>{
        setCurrentPage(e);
    }

    const priceHandler = (event,newPrice) =>{
        setPrice(newPrice);
    }

    const [category , setCategory]=useState("");
    const [ratings,setRatings]=useState(0);


    useEffect(()=>{

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProduct(keyword,currentPage,price,category,ratings));

    },[dispatch,error,keyword,currentPage,price,category,ratings]);

    
    let count = filteredProductsCount;


    return ( 

        <Fragment>
            {loading ? (<Loader/>):(
                <Fragment>
                    <MetaData title="BigMoMDaru.com LIQUIOR"/>
                    <h2 className="productsHeading">Search Your LIQUIOR</h2>

                    <div className="products">
                        {products && products.map((product,i) => <ProductCard key={i} product={product}/>)}

                    </div>


                    <div className="filterBox">

                         <Typography>Price</Typography>
                         <Slider

                         value={price}
                         onChange={priceHandler}
                         valueLabelDisplay="auto"
                         aria-labelledby="range-slider"
                         min={0}
                         max={25000}
                         />


                         <Typography>Categoary</Typography>
                         <ul className="categoryBox">
                             {categories.map((category)=>(
                                 <li className="category-link"

                                 key={category}
                                 onClick={()=>setCategory(category)}
                                 
                                 >
                                  {category}
                                 </li>
                             ))}
                         </ul>


                         <fieldset>
                             <Typography className="legend">Ratings Above</Typography>
                             <Slider
                               value={ratings}
                               onChange={(e, newRating) => {
                                 setRatings(newRating);
                               }}
                               aria-labelledby="continuous-slider"
                               valueLabelDisplay="auto"
                               min={0}
                               max={5}
                               />
                         </fieldset>


                     </div>


                    {resultPerPage < count && (
                    <div className="paginationBox">
                        <Pagination 
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"

                        />   


                    </div>


                    )}




                  


                </Fragment>
            )}

           <ToastContainer
            position="bottom-center"
            theme="dark"
            draggable={false}
            />


        </Fragment>

    )
};

export default Products;