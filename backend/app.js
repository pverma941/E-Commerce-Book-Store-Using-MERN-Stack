const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser');
const fileUpload=require('express-fileupload')
const error = require('./middleware/error');
const path = require('path')
//link to config folder
if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config({path:'backend/config/config.env'})
}


app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended:true}))
app.use(fileUpload());

const productRoute=require('./Routes/productroute')
const userRoute = require("./Routes/UserRoute")
const orderRoute=require('./Routes/OrderRoute')
const paymentRoute=require('./Routes/PaymentRoute')

app.use('/api/v1',productRoute);
app.use('/api/v1',userRoute);
app.use('/api/v1',orderRoute); 
app.use('/api/v1',paymentRoute); 
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// err middleware
app.use(error);

module.exports = app;