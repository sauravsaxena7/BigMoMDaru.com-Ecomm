const express = require("express");

const cors = require("cors");

const app = express();

const path = require("path");

const errorMiddleWare = require("./middleware/error");


//config

if(process.env.NODE_ENV!=="PRODUCTION"){

  require("dotenv").config({path:"backend/config/config.env"});


}


// const dotenv = require("dotenv");


//config

// dotenv.config({path:"backend/config/config.env"});



app.use(express.json());


const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");





app.use(cookieParser());

app.use(cors())

app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());



//route Imports

const product =  require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoutes");
const payment= require("./routes/paymentRoute");


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));


app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
  


app.use(errorMiddleWare);



module.exports=app;