const express =require('express')
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
require('../../../db/configration');
const User = require("../../../db/UserModel");
const router = express.Router();

const secritkey=process.env.SECRET_KEY
let salt=bcrypt.genSaltSync(10)
router.post("/registration", async (req, res) => {
    const exist = await User.findOne({ email: req.body.email });
    if (exist) {
      res.send(false);
    } else {

    try { 
      
         let { name, age, email, password, nmbr , address} = req.body;
  
      //hashing password...
      
      const hashedPassword = await bcrypt.hash(password, salt);
      const data = new User({
        name,
        age,
        email,
        address:[address],
        password: hashedPassword,
        nmbr,
      });
  
      //creating token...
      // let a = {email:data.email,name:data.name,nmbr:data.nmbr};
      
      //   const tokenn = Jwt.sign(a, secritkey,{expiresIn:"1h"});
      //   data.tokens = data.tokens.concat({ token: tokenn });
        const result = await data.save();
        delete result.password;
        res.status(200).send(result);
      }catch(err){
        res.status(500).send({message:"Server is not working"})
      }
    }
  });

module.exports=router;
