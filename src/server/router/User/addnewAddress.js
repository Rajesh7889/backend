const express =require('express')
require('../../../db/configration');
const User = require("../../../db/UserModel");
const router = express.Router();


router.put("/update-details/:id", async (req, resp) => {
    try{
      const data = await User.updateOne(
        { _id: req.params.id },
        {$push:{address:req.body}}
      );
      if(data.acknowledged===true){
        let data=await User.findOne({_id:req.params.id})
        resp.status(200).send(data)
      }else{
        result.send(false)
      };
    }catch(err){
      resp.status(500).send({message:"Server is not working"})
    } 
    
  });
  

module.exports=router;