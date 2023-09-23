const express =require('express')
require('../../../db/configration');
const Items = require("../../../db/Productmodel");
const router = express.Router();



router.get("/categorical-search/itm/:key", async (req, resp) => {
    try {
      const products = await Items.find({
                                           $or: [
                                                   { name: { $regex: req.params.key , '$options' : 'i'} },
                                                   { company: { $regex: req.params.key , '$options' : 'i'} },
                                                   { subcat: { $regex: req.params.key , '$options' : 'i'} },
                                                ]
                                        }
                                    )

      products.length===0
              ?resp.send(false)
              :resp.send(products);

    } catch (err) {
      resp.status(500).send();
    }
  });

module.exports=router;
