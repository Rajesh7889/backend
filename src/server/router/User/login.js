const express =require('express')
const bcrypt = require("bcrypt");
require('../../../db/configration');
const User = require("../../../db/UserModel");
const router = express.Router();

router.post("/login", async (req, resp) =>{
    try{
      const data = await User.findOne({ email: req.body.email });
      if (data === null) {
          resp.send(false);
      } else if (await bcrypt.compare(req.body.pswd, data.password)){
         resp.send(data);
      }else{
        resp.send(false)
      }
    }catch(err){
      resp.send("Server is not working");
    }  
  });

  module.exports=router;