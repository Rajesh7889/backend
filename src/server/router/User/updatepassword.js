const express =require('express')
const bcrypt = require("bcrypt");
require('../../../db/configration');
const User = require("../../../db/UserModel");
const router = express.Router();


router.put("/update-password/:id", async (req, resp) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try{
      const data = await User.updateOne(
        { _id: req.params.id },
        { $set:{password:hashedPassword} }
      );
      if(data.acknowledged===true){result.send(true)}
      else{result.send(false)};
    }catch(err){resp.send("Server is not working")} 
  });
  

module.exports=router;
