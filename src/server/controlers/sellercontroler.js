const Seller=require("../../models/SellerModel")

//new seller..
exports.newseller=async(req,resp,next)=>{
 try{
    req.body.TotalItms=0;
    req.body.totalsoldItms=0;
    let seller= new Seller(req.body)
    const result = await seller.save()
    result?
    resp.status(201).send({status:"success",
                           message:"seller registered successfully"
                          })
    :resp.status(404).send("something went wrong")
 }catch(err){
    console.log(err)
 }   
}

//checking if email already registered.
exports.Selleremailcheck=async (req, resp,next) => {
    try{
      const products = await Seller.find({ email:req.params.email});
      products.length!==0
         ? resp.send(products[0]._id) 
         : resp.send(false);
    }catch(err){
      resp.send("Server is not working")
    }
  }

// get seller details..
exports.getSeller=async(req,resp,next)=>{
    let user=await Seller.findOne({_id:req.params.id});
    user
    ?resp.status(200).send({data:user})
    :resp.status(204).send({data:false})
}