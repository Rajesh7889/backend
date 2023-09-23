const express =require('express')
const bcrypt = require("bcrypt");
require('../../../db/configration');
const User = require("../../../db/UserModel");
const router = express.Router();


router.put("/update-details/:id", async (req, resp) => {
    try{
      const data = await User.updateOne(
        { _id: req.params.id },
        { $set:{name:req.body.naame,
                nmbr:req.body.nmbr,
                address:req.body.address
               } 
        }
      );
      if(data.acknowledged===true){
        let data=await User.findOne({_id:req.params.id})
        resp.send(data)
      }else{
        result.send(false)
      };
    }catch(err){
      resp.send("Server is not working")
    } 
    
  });
  

module.exports=router;