const express =require('express')
const Jwt = require("jsonwebtoken")
require('../../../db/configration')
const Items = require("../../../db/Productmodel");
const router = express.Router()


router.get("/search-myproduct/:key", async (req, resp) => {

    const token = Jwt.verify(
                         req.header("Authorization"),
                         process.env.SECRET_KEY
                    )
   
    try {
      const products = await Items.find(
                { $and:[
                         {userId: token.a },
                         {$or: [
                                  { name: { $regex: req.params.key } },
                                  { company: { $regex: req.params.key } },
                               ]
                         },
                       ]
                });

       products.length===0?resp.send(false):resp.send(products);

    } catch (err) {

      resp.status(500).send();
    }
    
  });

module.exports=router;
