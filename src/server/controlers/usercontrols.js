const User = require("../../models/UserModel");
const Items = require("../../models/Productmodel");
const Order = require("../../models/OrderModel");
const bcrypt = require("bcrypt");
let salt=bcrypt.genSaltSync(10)
const Jwt = require("jsonwebtoken");
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
const secritkey=process.env.SECRET_KEY

//user signup...
exports.signup=async (req, res,next) => {
    const exist = await User.findOne({ email: req.body.email });
    if (exist) {
      res.send(false);
    } else {
    try { 
      //hashing password...
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password=hashedPassword
       const data = new User(req.body);
       const result = await data.save();
          delete result.password;
          res.status(200).send(result);
      }catch(err){
        res.status(500).send({message:"Server is not working"})
      }
    }
  }


//user login...
exports.login=async (req, resp,next) =>{
    try{
      const data = await User.findOne({ email: req.body.email });
      if (data === null) {
          resp.send(false);
      } else if (bcrypt.compare(req.body.pswd, data.password)){
        let a = data._id;
        const tokenn =Jwt.sign({ a }, secritkey,{expiresIn:'1h'});
        data.tokens = data.tokens.concat({ token: tokenn });
        resp.send(data);
      }else{
        resp.send(false)
      }
    }catch(err){
      resp.send("Server is not working");
    }  
  }
//delete existing address...
exports.deleteAddress=async (req, resp,next) => {
    try{
       const result=await Order.findOne({OrdrAdrsId:req.params.adrsId})
       let OrdrStatus=false;
        result?.length
            &&result.map(itm=>{
              if(itm.OrdrStatus){
                OrdrStatus=true
              }
            })
       if(result===null||!OrdrStatus){
           const data = await User.updateOne({_id:req.params.userId},
                                             {"$pull": {"address":{_id:req.params.adrsId}}}
                                            )    
           if(data.acknowledged){
             const newdata=await User.findOne({_id:req.params.userId})
                resp.status(200).json({status:"success",
                                        data:newdata}
                                      )
           }else{
               resp.status(404).json({status:"failed",
                                      message:"donot updated"}
                                    )
           }
       }else if(result.OrdrStatus){console.log("order registered")
          resp.status(204).json({status:"unsuccessful",
                                 message:"can't delete because order registered with this address"}
                                )
       }
    }catch(err){
      resp.status(404).json({status:"failed",
                             message:"server error"})
    } 
  }



//getting user favorite product list and mycard...
exports.userfavandMycard=async(req,resp)=>{
    const user = await User.findOne({_id:req.params.id})
    const mylist=req.params.like==='liked'
                 ?user.liked
                 :req.params.like==='card'
                 &&user.card
       const products=await Items.find({_id:mylist})
       resp.send(products)
}


//updating user favorite product list and mycard...
exports.updatefavAndMyCardlist=async(req,resp,next)=>{
    try{
          const result=await User.findOne({_id:req.params.userId})
          const mylist=req.params.type==='liked'
                   ?result.liked
                   :req.params.type==='card'
                   &&result.card
          const alreadyinlist=mylist.filter((itm)=>itm===req.params.productId)
                 if(alreadyinlist.length){
                      const data=await User.updateOne(
                              { _id: req.params.userId },
                              {"$pull": req.params.type==='liked'
                                          ?{'liked':req.params.productId}
                                          :req.params.type==='card'
                                          &&{ "card":req.params.productId}
                              })
                   }else{
                      const data=await User.updateOne(
                             { _id: req.params.userId },
                             {"$push": req.params.type==='liked'
                                         ?{'liked':req.params.productId}
                                         :req.params.type==='card'
                                         &&{ "card":req.params.productId}})
                   }
                  let data=await User.findOne({_id:req.params.userId})
                     resp.send(data)
      }catch(err){console.log(err)}
  }

//updating user password...
exports.updatePassword=async (req, resp,next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try{
      const data = await User.updateOne(
        { _id: req.params.id },
        { $set:{password:hashedPassword} }
      );
      if(data.acknowledged===true){result.send(true)}
      else{result.send(false)};
    }catch(err){resp.send("Server is not working")} 
  }


//updating user profile...
exports.updateProfile=async (req, resp,next) => {
    let {name,age,nmbr,address}=req.body
     try{
          if(req.body.address.id){
              const data = await User.updateOne({_id:req.params.id},
                                              {$set:{
                                                      name,
                                                      age,
                                                      nmbr,
                                                      'address.$[i].City':address.City,
                                                      'address.$[i].Country':address.Country,
                                                      'address.$[i].District':address.District,
                                                      'address.$[i].State':address.State,
                                                      'address.$[i].LandMark':address.LandMark,
                                                      'address.$[i].HouseNmbr':address.HouseNmbr,
                                                      'address.$[i].pincode':address.pincode,
                                                    }
                                              },
                                              {arrayFilters:[{'i._id':address.id}]}
                                             );
           }else{
            const data = await User.updateOne({_id: req.params.id},
                                              {$set:{name,
                                                     age,
                                                     nmbr,
                                                     },
                                               $push:{address:{
                                                          City:address.City,
                                                          Country:address.Country,
                                                          District:address.District,
                                                          State:address.State,
                                                          LandMark:address.LandMark,
                                                          HouseNmbr:address.HouseNmbr,
                                                          pincode:address.pincode
                                                      }}
                                              }
                                             );
        }
        let details=await User.findOne({_id:req.params.id})
        resp.status(201).send({status:'successfull',
                               data:details 
                              })
    }catch(err){
      resp.status(500).send({message:"Server is not working"})
    } 
  }



//checking user existance...
exports.userexistornot=async (req, resp,next) => {
    try{
      const products = await User.find({ email:req.params.email});
      products.length!==0
         ? resp.send(products[0]._id) 
         : resp.send(false);
    }catch(err){
      resp.send("Server is not working")
    }
  }

// adding new order address....
exports.neworderaddress=async (req, resp,next) => {
    try{
      const data = await User.updateOne(
        { _id: req.params.id },
        {$push:{address:req.body}}
      );
      if(data.acknowledged===true){
        let data=await User.findOne({_id:req.params.id})
        resp.status(200).send(data)
      }else{
        result.send(false)
      };
    }catch(err){
      resp.status(500).send({message:"Server is not working"})
    } 
  }