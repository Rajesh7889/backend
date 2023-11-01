const Seller=require("../../models/SellerModel")

exports.newseller=async(req,resp,next)=>{
    let seller= new Seller(req.body)
    const result = await seller.save()
    resp.send(result)
}