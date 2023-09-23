const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
const PORT=process.env.PORT

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use(require('./router/User/login'))
app.use(require('./router/User/signup'))
app.use(require('./router/User/userexist'))
app.use(require('./router/User/updatepassword'))
app.use(require('./router/User/updateAddress'))
app.use(require('./router/User/updatefavAndMycardlist'))
app.use(require('./router/User/getfavAndMycardlist'))
app.use(require('./router/products/addproduct'))
app.use(require('./router/products/allproducts'))
app.use(require('./router/products/mysellingproduct'))
app.use(require('./router/products/updatesellingproduct'))
app.use(require('./router/products/deletesellingproduct'))
app.use(require('./router/products/productdetails'))
app.use(require('./router/products/searchproduct'))
app.use(require('./router/products/productsubcategories'))
app.use(require('./router/products/productcategories'))
app.use(require("./router/orders/saveorder"))
app.use(require("./router/seller/saveseller"))


app.listen(PORT);
