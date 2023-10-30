const mongoose=require("mongoose")
const SellerSch= new mongoose.Schema({
                         UserId:mongoose.Schema.ObjectId,
                         Ferm:String,
                         TermsNdconditions:Boolean,
                         Accountnmbr:Number,
                         Notification:String,
                         TotalItms:Number,
                         soldItms:Number,
                         Address:{
                              country:String,
                              State:String,
                              PinCode:Number,
                              City:String
                         }
                    })

 module.exports =mongoose.model("Seller",SellerSch)