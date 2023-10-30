const express =require('express')
require('../../../db/configration');
const Order = require("../../../db/OrderModel");
const router = express.Router();

router.post('/order',async(req,resp)=>{console.log("reaching")
     
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
                                                        ordrCnclInfo:{
                                                            reasonCode:null,
                                                            refundMode:null,
                                                            cnclDate:null,
                                                            reason:null
                                                        }
                                                        }
                            ))
            })
            
                const result = await Order.insertMany(orders)
                if(result.length){
                resp.status(200).send({message:"order saved successfully"})
    }}catch(err){
        resp.status(500).send({message:"server not working"})
    }
    
})

module.exports=router;