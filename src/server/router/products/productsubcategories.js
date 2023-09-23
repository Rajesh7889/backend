const express =require('express')
const bcrypt = require("bcrypt");
require('../../../db/configration');
const Items = require("../../../db/Productmodel");
const router = express.Router();


router.get("/subcateries-search/:cat/:subcat", async (req, resp) => {
    try {
      const products = await Items.find({
                                            $and:[
                                              {category:req.params.cat},
                                              {subcatcod:req.params.subcat}
                                            ]
        
                                        });
  
      products.length===0
              ?resp.send(false)
              :resp.send(products);
              
    } catch (err) {
      resp.status(500).send();
    }
  });

module.exports=router;
