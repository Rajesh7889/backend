const express =require('express')
require('../../../db/configration');
const Order = require("../../../db/OrderModel");
const router = express.Router();

router.post('/order',async(req,resp)=>{
    let data = new Order(req.body)
    const result = await data.save()
    resp.send(result)
})


module.exports=router;