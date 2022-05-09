const sendToken  = (User,ststuscode,res)=>{
    //create token and saving cookie
    
    
    const token= User.getJWTToken();


    //options for cookie

    const options = {
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24*60*60*1000

        ),

        httpOnly:true,

    };

    res.status(ststuscode).cookie("token",token,options).json({
        success:true,
        User,
        token
    });

};

module.exports = sendToken;