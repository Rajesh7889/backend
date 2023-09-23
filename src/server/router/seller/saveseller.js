const express =require('express')
require('../../../db/configration');
const Seller=require("../../../db/SellerModel")
const router = express.Router();


router.post("/seller",async(req,resp)=>{
    let seller= new Seller(req.body)
    const result = await seller.save()
    resp.send(result)
})

module.exports=router;