const express =require('express')
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
require('../../../db/configration');
const User = require("../../../db/UserModel");
const router = express.Router();

const secritkey=process.env.SECRET_KEY

router.post("/registration", async (req, res) => {
    const exist = await User.findOne({ email: req.body.email });
    if (exist) {
      res.send(false);
    } else {
      let { name, age, email, password, nmbr , address} = req.body;
  
      //hashing password...
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = new User({
        name,
        age,
        email,
        address,
        password: hashedPassword,
        nmbr,
      });
  
      //creating token...
      let a = data._id;
      try {
        const tokenn = Jwt.sign({ a }, secritkey);
        data.tokens = data.tokens.concat({ token: tokenn });
      } catch (err) {res.send("Server is not working")}
      
      try{
        const result = await data.save();
        delete result.password;
        res.send(result);
      }catch(err){
        res.send("Server is not working")
      }
    }
  });

module.exports=router;
