const express = require("express");
require("../../../db/configration");
const Items = require("../../../db/Productmodel");
const Jwt = require("jsonwebtoken");
const router = express.Router();

var authJwt=(req,resp,next)=>{
      let token=req.header("Authorization");
     // token=token.split(' '[1]);
      Jwt.verify(
            token,
            process.env.SECRET_KEY,
            (err,docs)=>{
               if(err){
                  resp.send({message:"Invalid Token"});
            }
            else{
                  req._id=docs.a
               next()   
            }
            }
          );

   }


router.get("/lists",authJwt, async (req, resp) => {
            try {
            const products = await Items.find({ userId:req._id});
                  resp.status(200).send(products);
            }catch(err) {
            resp.status(500).send({message:"server in not working"});
            }

});

  

    

module.exports = router;
