const mongoose=require("mongoose")

const OrderScheme= new mongoose.Schema({
                                        prdctId:mongoose.Schema.ObjectId,
                                        noOfItems:Number,
                                        CnsmrId:mongoose.Schema.ObjectId,
                                        sellerId:mongoose.Schema.ObjectId,
                                        OrderTracking:{
                                                       lat:Number,
                                                       lng:Number,
                                                      },
                                        OrdrStatus:Boolean,
                                        OrdrDate:Date,
                                        OrdrAdrsId:mongoose.Schema.ObjectId,
                                        ordrStage:Number,
                                        paymentMode:String,
                                        ordrCnclInfo:{
                                            reasonCode:Number,
                                            refundMode:Number,
                                            cnclDate:Date,
                                            reason:String
                                        }
                                       })
 module.exports = mongoose.model("orders",OrderScheme)
 
