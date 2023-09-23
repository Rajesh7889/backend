const express =require('express')
require('../../../db/configration');
const User = require("../../../db/UserModel");
const router = express.Router();


    router.post("/checkemail/:email", async (req, resp) => {

        try{
          const products = await User.find({ email:req.params.email});
        
          products.length!==0
             ? resp.send(products[0]._id) 
             : resp.send(false);
      
        }catch(err){
          resp.send("Server is not working")
        }
        
      });

module.exports=router;
