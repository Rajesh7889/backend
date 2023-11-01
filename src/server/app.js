const express = require("express");const orderroute=require("./router/orderroute")
const userroute=require("./router/userroute")
const sellerroute=require('./router/sellerroute')
const productsroute=require('./router/productsroute')
const cors = require("cors");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true
}));

app.use("/api/v1", userroute);
app.use("/api/v1", productsroute);
app.use("/api/v1",orderroute)
app.use("/api/v1",sellerroute)

module.exports = app;
