const mongoose=require("mongoose")
const UserSch= new mongoose.Schema({
                         name:String,
                         age:Number,
                         email:String,
                         password:String,
                         nmbr:Number,
                         tokens:[
                              {
                              token:String
                         }],
                         liked: {
                              type: Array,
                         },
                         card: {
                              type: Array,
                         },
                         Notification:String,
                         address:{
                              Country:String,
                              State:String,
                              District:String,
                              City:String,
                              LandMark:String,
                              HouseNmbr:String,
                              pincode:Number
                           }
                    })

 module.exports =mongoose.model("records",UserSch)

