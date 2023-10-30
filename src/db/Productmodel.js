const mongoose=require("mongoose")

const productsScheme= new mongoose.Schema({
     name:String,
     price:Number,
     category:Number,
     categorytitle:String,
     subcat:String,
     subcatcod:String,
     about:String,
     userId:mongoose.Schema.ObjectId,
     company:String,
     img:String,
     rating:Number,
     available:Boolean,
     offPercent:Number
})
 module.exports =mongoose.model("products",productsScheme)