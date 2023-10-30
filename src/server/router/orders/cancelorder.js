const express =require('express')
require('../../../db/configration');
const Order = require("../../../db/OrderModel");
const router = express.Router();

router.put('/cancelorder/:id',async(req,resp)=>{
    try{ 
     const result = await Order.updateOne({_id:req.params.id},
                                              {$set:{ordrStage:6,
                                                     OrdrStatus:false,
                                                   "ordrCnclInfo.cnclDate":new Date(),
                                                   "ordrCnclInfo.reasonCode":req.body.reasonCode,
                                                   "ordrCnclInfo.refundMode":req.body.refundMode,
                                                   "ordrCnclInfo.reason":req.body.reason
                                                   }
                                              })
   
       resp.status(200).send(result.acknowledged)
    }catch(err){
       resp.status(500).send({message:"server is not working"})
    }})


module.exports=router;