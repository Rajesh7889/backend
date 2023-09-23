const mongoose=require("mongoose")

const OrderScheme= new mongoose.Schema({
                                        prdctId:Array,
                                        CnsmrId:String,
                                        OrderTracking:{
                                                       lat:Number,
                                                       lng:Number,
                                                      },
                                        OrdrStatus:Boolean,
                                        OrdrDate:String,
                                        OrdrTiming:Number,
                                        deliveryCharges:Number,
                                        totalamount:Number
                                       })
 module.exports = mongoose.model("orders",OrderScheme)
 
