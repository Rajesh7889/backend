///update-my-profile/${userId}`,details
const express =require('express')
require('../../../db/configration');
const User = require("../../../db/UserModel");
const router = express.Router();


router.put("/update-my-profile/:id", async (req, resp) => {
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
        console.log(details)
        resp.status(201).send({status:'successfull',
                               data:details 
                              })
    }catch(err){
      resp.status(500).send({message:"Server is not working"})
    } 
    
  });
  

module.exports=router;