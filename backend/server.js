const app = require("./app");

const dotenv =  require("dotenv");

const connectDatabase = require("./config/database")

const cloudinary = require("cloudinary");



//Handling Uncaught exception

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);

    console.log(`shutting down the server due to uncaughtException`);

    process.exit(1);
});

//console.log(oo);


//config

if(process.env.NODE_ENV!=="PRODUCTION"){

    require("dotenv").config({path:"backend/config/config.env"});


}



//connecting to database

connectDatabase();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})



const server=app.listen(process.env.PORT,()=>{

    console.log(`Server is running on http://localhost:${process.env.PORT}`);

});



//Unhandled Promise Rjection 

process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);

    server.close(()=>{

        process.exit(1)

    });
})