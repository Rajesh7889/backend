const express =require('express')
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
require('../../../db/configration');
const User = require("../../../db/UserModel");
const router = express.Router();
const secritkey=process.env.SECRET_KEY

router.post("/login", async (req, resp) =>{
    try{
      const data = await User.findOne({ email: req.body.email });
      if (data === null) {
          resp.send(false);
      } else if (bcrypt.compare(req.body.pswd, data.password)){
        let a = data._id;
        const tokenn = Jwt.sign({ a }, secritkey,{expiresIn:'1h'});
        data.tokens = data.tokens.concat({ token: tokenn });
        resp.send(data);
      }else{
        resp.send(false)
      }
    }catch(err){
      resp.send("Server is not working");
    }  
  });

  module.exports=router;