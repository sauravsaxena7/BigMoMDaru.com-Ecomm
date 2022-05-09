const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


const user = require("../modals/userModal");

const sendToken = require("../utils/jwtToken");

const sendEmail = require("../utils/sendEmail.js");

const crypto = require("crypto");

const cloudinary = require("cloudinary");


//register user


exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
  
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",

    });



    const {name,email,password} = req.body;

    


    const User  = await user.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    })


   sendToken(User,200,res);

});


//Login User

exports.loginUser = catchAsyncErrors(async (req,res,next)=>{
    const {email,password} = req.body;

    //checking if user has given password and email or not

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email And Password",400) );

    }

    const User =  await user.findOne({email}).select("+password");

    if(!User){
        return next(new ErrorHandler("Invalid email or password"),401);
    }

    const isPasswordMatched = await User.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password"),401);

    }

    sendToken(User,200,res);

});



exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"Logged Out",
    });

    
});


exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{

    const User  = await user.findOne({email:req.body.email});

    if(!User){
        return next(new ErrorHandler("user not found",404));
    }

    //get resetpassword token

    const resetToken= User.getResetPasswordToken();

    await User.save({validateBeforeSave:false});


    const resetPasswordUrl =`${req.protocol}://${req.get(
        "host"
      )}/password/reset/${resetToken}`;

const message = `Your password reset token is :-\n\n ${resetPasswordUrl} \n\nif you have not requested this email please ignore it.`;

try{

    await sendEmail({

        email:User.email,
        subject:'Ecommerece Password Recovery',
        message:message


    });

    res.status(200).json({
        success:true,
        message:`Email sent to ${User.email} successfully`,
    })

}catch(error){
    User.resetPasswordToken = undefined;
    User.resetPasswordExpire=undefined;

    await User.save({validateBeforeSave:false});


    return next(new ErrorHandler(error.message,500));



}

});


//reset password

exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{


    //creating token hash

    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const User = await user.findOne({resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()}},
    )


    if(!User){
        return next(new ErrorHandler("Reset Password token is invalid or has been expired",404));


    }

    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not matched with confirm password",404));

    }

    User.password = req.body.password;
    User.resetPasswordToken = undefined;
    User.resetPasswordExpire=undefined;

    await User.save();



    // sendToken(User,200,res);

    res.status(200).json({
        success:true,
       
    })



});

//get User details


exports.getUserDetails = catchAsyncErrors(async (req,res,next)=>{
    
    const User  = await user.findById(req.user.id);

    res.status(200).json({
        success:true,
        User
    })
});


exports.updateUserPassword = catchAsyncErrors(async (req,res,next)=>{
    const User  = await user.findById(req.user.id).select("+password");



    const isPasswordMatched = await User.comparePassword(req.body.oldpassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("old password is incorrect"),400);


    }


    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't match"),400);

    }

    User.password = req.body.newPassword;

    await User.save();

    sendToken(User,200,res);


   
});



exports.updateUserProfile = catchAsyncErrors(async (req,res,next)=>{


    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    }


   

    if(req.body.avatar!=="/Profile.png"){

        const User = await user.findById(req.user.id);
        const imageId = await User.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);


        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale",
    
        });

        newUserData.avatar={
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    







    }

    const User =await user.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    

    res.status(200).json({
        success:true,
       
    })

   
});





//Get All Users(Admin)


exports.getAllUser = catchAsyncErrors(async (req,res,next) =>{


    const Users = await user.find();

    res.status(200).json({
        success:true,
        Users
    });



});




exports.getSingleUser = catchAsyncErrors(async (req,res,next) =>{


    const User = await user.findById(req.params.id);

    if(!User){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));

    }

    res.status(200).json({
        success:true,
        User
    });



});



//Update User Role By Admin
exports.updateUserRole = catchAsyncErrors(async (req,res,next)=>{


    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }


    



    const User =await user.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    

    res.status(200).json({
        success:true,
        User
    })

   
});


//Delete User By Admin


exports.deleteUser = catchAsyncErrors(async (req,res,next)=>{



    const User = await user.findById(req.params.id);


    //we will remove clodnary

    if(!User){
        return next(new ErrorHandler(`User doesn't exist with id: ${req.params.id}`));

    }


    const imageId  = User.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);




    await User.remove();

    res.status(200).json({
        success:true,
        "message":"User Deleted Successfully"
    });

});


