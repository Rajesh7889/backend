const { default: mongoose } = require('mongoose');
const Order = require("../../models/OrderModel");


//new order...
exports.neworder=async(req,resp,next)=>{
     
    try{
           const{prdctId}=req.body
           let prdctIds=[]
           let nmbrofitms=[]
           prdctId.map((ordrdtls)=>{
               prdctIds.push(Object.keys(ordrdtls))
               nmbrofitms.push(Object.values(ordrdtls))
           })
           prdctIds=prdctIds.flat()
           nmbrofitms=nmbrofitms.flat()
           let orders=[]
           prdctIds.map((id,index)=>{
               orders.push(Object.assign({},req.body, {
                                                       prdctId:prdctIds[index],
                                                       noOfItems:nmbrofitms[index],
                                                       OrdrDate:new Date(),
                                                       ordrStage:1,
                                                       OrdrAdrsId:req.body.OrdrAdrsId,
                                                       ordrCnclInfo:{
                                                           reasonCode:null,
                                                           refundMode:null,
                                                           cnclDate:null,
                                                           reason:null
                                                       }
                                                       }
                           ))
           })
               const result = await Order.insertMany(orders);
               result && resp.status(200).send({message:"order saved successfully"})
                
}catch(err){
       resp.status(500).send({message:"server not working"})
   }
   
}

    
// my orders....
    exports.myorders=async(req,resp,next)=>{
    
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
                                "productDetails.imgs":1,
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
          
      }

      //cancel order...
      exports.cancelorder=async(req,resp,next)=>{
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
        }}
    