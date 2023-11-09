const mongoose=require("mongoose")

const notificationScheme= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      question: {
              type: String,
              required: true,
            },
      answer: {
              type: String,
            },
      status:{
        type:Boolean,
        default:false
      }
})


module.exports =mongoose.model("notification",notificationScheme)