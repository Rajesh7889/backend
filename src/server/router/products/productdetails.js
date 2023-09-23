const express =require('express')
require('../../../db/configration');
const Items = require("../../../db/Productmodel");
const router = express.Router();


router.get("/get-products-details/:id", async (req, resp) => {
    try{
         const products = await Items.find({ _id: req.params.id });
         products 
              ? resp.send(products) 
             : resp.send("not found");
    }catch(err){resp.send("Server is not working")}
  });

module.exports=router;






