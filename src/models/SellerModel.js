const mongoose=require("mongoose")
const SellerSch= new mongoose.Schema({
                         _id:{
                              type: mongoose.Schema.ObjectId,
                              ref: "User",
                              required: true,
                            },
                         name:{
                              type: String,
                              required: true,
                            },
                         email:{
                              type: String,
                              required: true,
                            },
                         nmbr:Number,
                         password:{
                              type: String,
                              required: true,
                            },
                         pincode:{
                              type: String,
                              required: true,
                            },
                         dsplynam:{
                              type: String,
                              required: true,
                            },
                         strDscrptn:{
                              type: String,
                              required: true,
                            },
                         PAN:{
                              type: String,
                              required: true,
                            },
                         GSTIN:{
                              type: String,
                              required: true,
                            },
                         TotalItms:{
                              type: Number,
                              default:0
                            },
                         totalsoldItms:{
                              type: Number,
                              default:0
                            },
                    })

 module.exports =mongoose.model("Seller",SellerSch)