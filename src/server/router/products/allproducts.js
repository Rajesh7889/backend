const express =require('express')
require('../../../db/configration');
const Items = require("../../../db/Productmodel");
const router = express.Router();

router.get("/all-products/:type", async (req, resp) => {

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
   
  });

  module.exports=router;


 
  
    const fxn=(allprdct)=>{
        
    
    return lists
   }