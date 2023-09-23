const express =require('express')
require('../../../db/configration');
const User = require("../../../db/UserModel");
const router = express.Router();


router.put('/user/product/:type/:userId/:productId',async(req,resp)=>{
    try{
          const result=await User.findOne({_id:req.params.userId})
        
          const mylist=req.params.type==='liked'
                   ?result.liked
                   :req.params.type==='card'
                   &&result.card
          
          const alreadyinlist=mylist.filter((itm)=>itm===req.params.productId)
         
                 if(alreadyinlist.length){
                      const data=await User.updateOne(
                              { _id: req.params.userId },
                              {"$pull": req.params.type==='liked'
                                          ?{'liked':req.params.productId}
                                          :req.params.type==='card'
                                          &&{ "card":req.params.productId}
                              })
                   }else{
                      const data=await User.updateOne(
                             { _id: req.params.userId },
                             {"$push": req.params.type==='liked'
                                         ?{'liked':req.params.productId}
                                         :req.params.type==='card'
                                         &&{ "card":req.params.productId}})
                   }
  
                  let data=await User.findOne({_id:req.params.userId})
                     resp.send(data)
  
      }catch(err){console.log(err)}
  })


module.exports=router;
