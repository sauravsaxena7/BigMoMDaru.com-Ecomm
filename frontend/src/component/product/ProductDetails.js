import React, { Fragment, useEffect, useState } from "react";


import { Box } from "@chakra-ui/react";

import "./ProductDetails.css";

import { useSelector, useDispatch} from "react-redux";

import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";

import { useParams } from "react-router-dom";

import ImageSlider from "../carsouel/ImageSlider";


import ReviewCard from "./ReviewCard.js"

import Loader from "../loader/loader";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addItemsToCart } from "../../actions/cartAction";

//import ProductCard from "../home/ProductCard";




import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,Button, 
} from "@material-ui/core"

import {Rating} from "@material-ui/lab"
import { NEW_REVIEW_RESET } from "../../constants/productConstant";


const ProductDetails = () =>{
    const dispatch = useDispatch();

   

    const { id } = useParams();

    const [quantity,setQuantity] = useState(1);
    const [rating,setRating]=useState(0);
    const [comment,setComment]=useState("");


    const [open,setOpen]=useState(false);

  
    const {product,loading,error} = useSelector(
        (state) => state.productDetails
        
    );

    


    const {success,error:reviewError}=useSelector(
      (state)=>state.newReview
    );



    //const {products,error:producsError} =  useSelector((state)=>state.products);



    const increaseQuantity = () =>{
        if (product.stock <= quantity) return;
  
  
        const qty=quantity+1;
        setQuantity(qty);
  
      }
  
  
      const decreaseQuantity = () =>{
  
        if (1 >= quantity) return;
  
        const qty=quantity-1;
        setQuantity(qty);
  
      }

      const submitReviewToggle = (e)=>{
        open ? setOpen(false) : setOpen(true);

      }

      const options = {
      
        value:product.rating,
        readOnly: true,
        precision:0.5,
        name:"unique-rating",
        

        
      };

      const addItemsToCartHandler = ()=>{
        dispatch(addItemsToCart(id,quantity));
  
        toast.success("Item Added TO Cart");
      }

      const reviewSubmitHandler = () =>{
        const myForm = new FormData();

        myForm.set("ratings",rating);
        myForm.set("comment",comment)
        myForm.set("productId",id);

        dispatch(newReview(myForm));
        setOpen(false);


      }

      

      // const keyword="";
      // const ratings =0

      // const currentPage=1;

      // const price = [0,25000];

      



      


   


    useEffect(() =>{

        if(error){

            toast.error(error)
            dispatch(clearErrors());
            
 
         }
          
         

       

         if(reviewError){

          toast.error(reviewError)
          dispatch(clearErrors());
          

       }

       

       if(success){
         toast.success("Review Submitted Successfully");
         dispatch({type:NEW_REVIEW_RESET});
       }

       


       

      


      //  if(category){
      //   dispatch(getProduct(keyword,currentPage,price,category,ratings));

        

      //  }

       

       

      
        dispatch(getProductDetails(id));


    },[dispatch,id,error,reviewError,success])

    return (
       <Fragment>

           {loading? (<Loader/>): (
                <Fragment>
                 

                <div className="ProductDetails">
                                <div>
                                    {/* <Carousel>
                                        {product.images &&
                                          product.images.map((item,i) => (
                                              <img 
                                                 className="CarouselImage"
                                                 key={item.url}
                                                 src={item.url}
                                                 alt={`${i} Slide`}  
                                                 />
                                          ))
                                        }
                                    </Carousel> */}
                
                                    <Box className="rBox" color="white">
                
                                    {product.images &&
                                         
                                            <ImageSlider slides={product.images}  />
                                             
                                        
                                        }
                                        
                
                                    </Box>
                                </div>
                
                                <div>
                              <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                              </div>
                              <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className="detailsBlock-2-span">
                                 
                                  ({product.numOfReviews} Reviews)
                                </span>
                              </div>
                              <div className="detailsBlock-3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                  <div className="detailsBlock-3-1-1">
                                    <button onClick={decreaseQuantity}>-</button>
                                    <span>{product.stock === 0 ?  0 : quantity}</span>
                                    <button onClick={increaseQuantity}>+</button>
                                  </div>
                                  <button
                                    disabled={product.stock < 1 ? true : false}
                                    onClick={addItemsToCartHandler}
                                   
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                
                                <p>
                                  Status:
                                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                                  </b>
                                </p>
                              </div>
                
                              <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                              </div>
                
                              <button onClick={submitReviewToggle} className="submitReview">
                                Submit Review
                              </button>
                            </div>
                
                            </div>
                
                
                            <h3 className="reviewsHeading">REVIEWS</h3>

                            <Dialog 
                            aria-labelledby="simple-dialog-title"
                            open={open}
                            onClose={submitReviewToggle}
                            >
                              <DialogTitle>Submit Review</DialogTitle>
                              <DialogContent className="submitDialog">
                                <Rating 
                                onChange={(e)=>setRating(e.target.value)}
                                value={rating}
                                size="large"
                                />

                                <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e)=>setComment(e.target.value)}
                                >

                                </textarea>

                              </DialogContent>

                              <DialogActions>
                                <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
                                <Button onClick={reviewSubmitHandler} color="primary">Submit</Button>
                              </DialogActions>

                              

                            </Dialog>
                
                          
                          
                
                          {product.reviews && product.reviews[0] ? (
                            <div className="reviews">
                              {product.reviews &&
                                product.reviews.map((review) => (
                                  <ReviewCard key={review._id} review={review} />
                                ))}
                            </div>
                          ) : (
                            <p className="noReviews">No Reviews Yet</p>
                          )}
                          
                          {/* <h2 className="productsHeading">Suggested Liquior</h2>
                          
                          <div className="products">
                            
                            {
                            products && products.filter(item => item._id !== poductId).map((product,i) => <ProductCard key={i} product={product}/>)

                            
                            }






                          </div> */}
                
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

export default ProductDetails;
