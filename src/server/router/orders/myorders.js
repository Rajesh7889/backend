const express =require('express')
require('../../../db/configration');
const Order = require("../../../db/OrderModel");
const Items = require("../../../db/Productmodel");
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get('/myorders/:id/:limit?',async(req,resp)=>{
    
  const CnsmrId=new mongoose.Types.ObjectId(req.params.id)
   try{
        const data=await Order.aggregate([
              {$match:{CnsmrId:CnsmrId}},
              { $lookup:{
                 from:"products",
                 localField:"prdctId",
                 foreignField:"_id",
                 as:"productDetails"
                }},
                {$sort:{"OrdrDate":-1}},
                ...(
                    (req.params.limit==1)
                      ? [{$limit:4}]
                      : []
                    ),
                {$project:{"noOfItems":1,
                          "OrderTracking":1,
                          "OrdrStatus":1,
                          "OrdrDate":1,
                          "OrdrAdrsId":1,
                          "productDetails.name":1,
                          "productDetails.price":1,
                          "productDetails.img":1,
                          "productDetails._id":1,
                          "ordrStage":1,
                          expectedDeliveryDate:{  $dateAdd:{startDate: "$OrdrDate",
                                                           unit: "day",
                                                           amount: 10}
                                               }
                        }}
            ])
            
        resp.send(data)
    }catch(err){
        console.log(err)
    }
    
})


module.exports=router;
// const express =require('express')
// require('../../../db/configration');
// const Order = require("../../../db/OrderModel");
// const Items = require("../../../db/Productmodel");
// const { default: mongoose } = require('mongoose');
// const router = express.Router();

// router.get('/myorders/:id/:limit?',async(req,resp)=>{
//   let limit=req.params.limit
//   const CnsmrId=new mongoose.Types.ObjectId(req.params.id)
//    try{
//         const data=await Order.aggregate([
//             { $facet: Array.prototype.concat( 
//                 [{$match:{CnsmrId:CnsmrId}}],
//                 (limit==true?[{$limit:2}]:[]),
//                 [{ $lookup:{
//                             from:"products",
//                             localField:"prdctId",
//                             foreignField:"_id",
//                             as:"productDetails"
//                             }}],
//                 [{$sort:{"OrdrDate":-1}}],
//                 [{$project:{"noOfItems":1,
//                           "OrderTracking":1,
//                           "OrdrStatus":1,
//                           "OrdrDate":1,
//                           "OrdrAdrsId":1,
//                           "productDetails.name":1,
//                           "productDetails.price":1,
//                           "productDetails.img":1,
//                           "productDetails._id":1,
//                           "ordrStage":1,
//                           expectedDeliveryDate:{  $dateAdd:{startDate: "$OrdrDate",
//                                                            unit: "day",
//                                                            amount: 10}
//                                                }
//                         }}
//                     ]
//                 )
//             }
//         ])
//         resp.send(data)
//     }catch(err){
//         console.log(err)
//     }
    
// })


// module.exports=router;