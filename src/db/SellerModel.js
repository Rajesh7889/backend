const mongoose=require("mongoose")
const SellerSch= new mongoose.Schema({
                         UserId:String,
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