const mongoose=require("mongoose")

const productsScheme= new mongoose.Schema({
     category:Number,
     categoryTitle:String,
     subcat:String,
     subcatcod:String,
     company:String,
     name: {
           type: String,
           required: [true, "Please Enter product Name"],
           trim: true,
         },
     price:{
           type: Number,
           required: [true, "Please Enter product Price"],
           maxLength: [8, "Price cannot exceed 8 characters"],
         },
     about:{
           type: String,
           required: [true, "Please Enter product Description"],
         },
     userId:{
           type: mongoose.Schema.ObjectId,
           ref: "User",
           required: true,
         },
     imgs:[
          {
            public_id: {
              type: String,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
          },
        ],
     rating: {
           type: Number,
           default: 0,
        },
     Stock: {
           type: Number,
           required: [true, "Please Enter product Stock"],
           maxLength: [4, "Stock cannot exceed 4 characters"],
           default: 1,
        },
     discount: {
           type: Number,
           default: 0,
        },
     numOfReviews: {
           type: Number,
           default: 0,
        },
     reviews: [
          {
            user: {
              type: mongoose.Schema.ObjectId,
              ref: "User",
              required: true,
            },
            name: {
              type: String,
              required: true,
            },
            rating: {
              type: Number,
              required: true,
            },
            comment: {
              type: String,
              required: true,
            },
          },
        ],
     createdAt: {
           type: Date,
           default: Date.now,
        },
     deliverCharges:{
           type:Number,
           default:0
     }
     
})
 module.exports =mongoose.model("products",productsScheme)