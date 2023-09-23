const express =require('express')
require('../../../db/configration');
const Items = require("../../../db/Productmodel");
const router = express.Router();


router.put("/update-product/:id", async (req, resp) => {
    try{
      const data = await Items.updateOne(
                           { _id: req.params.id },
                           { $set: req.body }
                         )
           if(data.acknowledged===true){
                  result.send(result)
            }else{
                 result.send(false)
            }
    }catch(err){resp.send("Server is not working")}
    
  });

module.exports=router;
