const express =require('express')
require('../../../db/configration');
const User = require("../../../db/UserModel");
const router = express.Router();
const Order = require("../../../db/OrderModel");

router.put("/deleteAddress/:userId/:adrsId", async (req, resp) => {
    
    try{
       const result=await Order.findOne({OrdrAdrsId:req.params.adrsId})
     
       let OrdrStatus=false;
        result?.length
            &&result.map(itm=>{
              if(itm.OrdrStatus){
                OrdrStatus=true
              }
            })
     
       if(result===null||!OrdrStatus){
           const data = await User.updateOne({_id:req.params.userId},
                                             {"$pull": {"address":{_id:req.params.adrsId}}}
                                            )    
           if(data.acknowledged){
             const newdata=await User.findOne({_id:req.params.userId})
                resp.status(200).json({status:"success",
                                        data:newdata}
                                      )
           }else{
               resp.status(404).json({status:"failed",
                                      message:"donot updated"}
                                    )
           }
       }else if(result.OrdrStatus){console.log("order registered")
          resp.status(204).json({status:"unsuccessful",
                                 message:"can't delete because order registered with this address"}
                                )
       }
    }catch(err){
      resp.status(404).json({status:"failed",
                             message:"server error"})
    } 
  });
  

module.exports=router;
