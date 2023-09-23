const express =require('express')
require('../../../db/configration');
const User = require("../../../db/UserModel");
const Items = require("../../../db/Productmodel");
const router = express.Router();

router.post('/user/get-products/:like/:id',async(req,resp)=>{
   
    const user = await User.findOne({_id:req.params.id})
   
    const mylist=req.params.like==='liked'
                 ?user.liked
                 :req.params.like==='card'
                 &&user.card

       
       const products=await Items.find({_id:mylist})
       resp.send(products)
   
  
})

module.exports=router;
