const Product =  require("../modals/productModal");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeature = require("../utils/apiFeature");
const cloudinary = require("cloudinary");



//Create Product

exports.createProduct = catchAsyncErrors(async (req,res,next)=>{



    let images = [];

    if(typeof req.body.images  === 'string'){

        images.push(req.body.images);



    }else{

        images = req.body.images;

    }

    const imageLink=[];

    for (let i = 0; i < images.length; i++) {

        const result = await cloudinary.v2.uploader.upload(images[i],{

            folder:"products",

        });

        imageLink.push({
            public_id:result.public_id,
            url:result.secure_url,
        });
        
    }


    req.body.images=imageLink;

    req.body.user=req.user.id;
   



    const product = await Product.create(req.body);


    res.status(201).json({
        success:true,
        product
    });
});

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

    //return next(new ErrorHandler("this is my new error",500));

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    
    const apiFeature = new ApiFeature(Product.find(), req.query)
      .search()
      .filter();
  
    let products = await apiFeature.query;
  
    let filteredProductsCount = products.length;
  
    apiFeature.pagination(resultPerPage);
  
    products = await apiFeature.query.clone();
  
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  });


//update produ

exports.updateProduct = catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404))
    }

    // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }


  if (images !== undefined) {
    //Deleting Images From Cloudinary
   

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);

    }


    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

    product  = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    const productsCount = await Product.countDocuments();

    res.status(200).json({
        success:true,
        product,
        productsCount,
    })
});

//deleteProduct

exports.deleteProduct =catchAsyncErrors( async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404))
    }

    //deleting image from cloudnary

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);

    }


    await product.remove();


    res.status(200).json({
        success:true,
        message:"Product Delete Successfully"
    })



    
});



//getSingleProductDetails

exports.getProductsDetails=  catchAsyncErrors(async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404))
    }

    res.status(200).json({
        success:true,
        product
    })


    
});


//create new reiview or update that reiview

exports.createProductReview = catchAsyncErrors(async (req,res,next)=>{


    const {ratings,comment,productId} = req.body;
    const reiview = {
        user:req.user._id,
        name:req.user.name,
        ratings:Number(ratings),
        comment
    }

    const product = await Product.findById(productId);

    const isReiewed = product.reviews.find(rev=>rev.user.toString()===req.user._id.toString());


    if(isReiewed){

        product.reviews.forEach(rev => {

            if(rev.user.toString()===req.user._id.toString()){

                (rev.ratings=ratings),(rev.comment=comment);
            }
            
            
        });

    }else{
        product.reviews.push(reiview);
        product.numOfReviews = product.reviews.length
    }
    let avg=0;
    product.reviews.forEach(rev=>{
        avg +=rev.ratings
    });

    product.rating=avg/product.reviews.length;


    await product.save({validateBeforeSave:false});



    res.status(200).json({
        success:true
    })

});



//Get all reviews of a single product


exports.getProductReviews = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }


    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
});


exports.deleteProductReviews = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }



    

    const reviews = product.reviews.filter(
        
        (rev)=>rev._id.toString() !== req.query.id.toString()



    );

    let avg=0;
    product.reviews.forEach(rev=>{
        avg +=rev.ratings
    });

    let rating = 0;
    if(reviews.length === 0){
        rating=0
    }else{

        rating  = avg/reviews.length;

    }


    
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,
        {
            reviews,
            rating,
            numOfReviews
        },
        {
            new:true,
            runValidators:true,
            useFindAndModify:false
        }
    )
    


    res.status(200).json({
        success:true,
    })


});


exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    //return next(new ErrorHandler("this is my new error",500));

    
  
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
      
    });
  });