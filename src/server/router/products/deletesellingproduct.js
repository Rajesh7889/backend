const express =require('express')
require('../../../db/configration');
const Items = require("../../../db/Productmodel");
const router = express.Router();

router.delete("/delete-product/:id", async (req, resp) => {
    try{
      const result = await Items.deleteOne({_id:req.params.id});
      console.log(result)
      if(result.acknowledged===true){resp.send(result.acknowledged)}else{
       resp.send(false)
      }
    }catch(err){resp.send("Server is not working")}
});

module.exports=router;
