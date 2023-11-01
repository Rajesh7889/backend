const Items = require("../../models/Productmodel");
const Jwt = require("jsonwebtoken")
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

//token verification..
exports.authJwt=(req,resp,next)=>{
    let token=req.header("Authorization");
   // token=token.split(' '[1]);
      Jwt.verify(token,process.env.SECRET_KEY,
                      (err,docs)=>{
                            if(err){
                            resp.send({message:"Invalid Token"});
                            }else{req._id=docs.a
                            next()}
                       }
       )
 }


//multer configration...
const storage = multer.diskStorage({
    destination: function (req, file, cb) 
       {cb(null, "../frontend/src/images/")},
    filename: function (req, file, cb)
      {const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname)},
 });
const upload = multer({ storage: storage });
exports.mltr=(req,resp,next)=>{
   return upload.single("img")
}

// adding new product....
exports.addnewproduct=async (req, resp,next) => {
             
                 try {
                       let images = [];

                        if (typeof req.body.imgs === "string") {
                          images.push(req.body.imgs);
                        } else {
                          images = req.body.imgs;
                        }
                        const imagesLinks = [];
                        for (let i = 0; i < images.length; i++) {
                          const result = await cloudinary.uploader.upload(images[i], {
                            folder: "products",
                          });
                          imagesLinks.push({
                            public_id: result.public_id,
                            url: result.secure_url,
                          });
                        }
                        req.body.imgs = imagesLinks;
                        const result = await Items.create(req.body);
                        result ? resp.status(201).send({status:true}) 
                               : resp.status(404).send({status:false});
                 } catch (err){
                  resp.status(500).send({status:false});
                 }
}

//show all product...
exports.allproduct=async(req,resp,next)=>{ 
     let lists=[]
     const list={}
      try{
        const products = await Items.find();
         for(let i=0; i<19;i++) {
            list[i]=  products.filter(itm=>itm.category===(111+i))
            list[i]=  list[i].length>5? list[i].slice(5):list[i]                  
             }  
           lists= Object.values(list)
           resp.send(lists)
       }catch(err){
        resp.send("Server is not working")
       }
}


//search product...
exports.searchproduct=async(req,resp,next)=>{
    try { const products = await Items.find({
                                             $or: [  { name: { $regex: req.params.key , '$options' : 'i'} },
                                                     { company: { $regex: req.params.key , '$options' : 'i'} },
                                                     { subcat: { $regex: req.params.key , '$options' : 'i'} },
                                                  ]
                                          })
        products.length===0
                ?resp.send(false)
                :resp.send(products);
      } catch (err) {resp.status(500).send()}
}


//deleting product...
exports.deleteproduct=async(req,resp,next)=>{
    try{const result = await Items.deleteOne({_id:req.params.id});
        console.log(result)
        if(result.acknowledged===true){
            resp.send(result.acknowledged)
        }else{
             resp.send(false)
        }
      }catch(err){resp.send("Server is not working")}
}


//seller products...tokn
exports.sellerproducts=async(req,resp,next)=>{
    try {
        const products = await Items.find({ userId:req._id});
              resp.status(200).send(products);
        }catch(err) {
        resp.status(500).send({message:"server in not working"});
        }
}


//seller products search..tokn
exports.searchsellerproducts=async(req,resp,next)=>{
    try {const products = await Items.find(
                  { $and:[
                           {userId: req._id},
                           {$or: [{name: { $regex: req.params.key } },
                                  { company: { $regex: req.params.key } },
                                 ]},
                       ]});
                products.length===0?resp.send(false):resp.send(products);
    } catch (err) {resp.status(500).send()}
  }



//get product details...
exports.productdetails=async(req,resp,next)=>{
    try{const products = await Items.find({ _id: req.params.id });
        products 
             ? resp.send(products) 
            : resp.send("not found");
   }catch(err){resp.send("Server is not working")}
}


//get products by categories...
exports.productBycategories=async(req,resp,next)=>{
    let lists=[]
    const list={} 
     try { const products = await Items.find({category:req.params.code});
           for(let i=0; i<19;i++) {
               list[i]= products.filter(itm=>itm.subcatcod===(`a${i}`))
               list[i]=list[i].length>5? list[i].slice(5):list[i]   
             }  
          lists= Object.values(list)
          resp.send(lists)
     }catch(err){resp.send("Server is not working")}
}


//get products by subcategories...
exports.productBysubcaetgories=async(req,resp,next)=>{
    try {
        const products = await Items.find({$and:[
                                                {category:req.params.cat},
                                                {subcatcod:req.params.subcat}
                                              ]});
        products.length===0
                ?resp.send(false)
                :resp.send(products);
      } catch (err) {resp.status(500).send()}
}


//update product details....
exports.updateproductdetals=async(req,resp,next)=>{
    try{const data = await Items.updateOne(
                             { _id: req.params.id },
                             { $set: req.body }
                           )
             if(data.acknowledged===true){
                    result.send(result)
              }else{
                   result.send(false)
              }
      }catch(err){resp.send("Server is not working")}
}

