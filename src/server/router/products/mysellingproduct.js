const express = require("express");
require("../../../db/configration");
const Items = require("../../../db/Productmodel");
const Jwt = require("jsonwebtoken");
const router = express.Router();


router.get("/lists", async (req, resp) => {
       const token = Jwt.verify(
                           req.header("Authorization"),
                           process.env.SECRET_KEY
                         );

       try {

             const products = await Items.find({ userId: token.a });
             if (products.length > 0) {
                       resp.send(products);
             } else {
                       resp.send(false);
             }

       } catch (err) {
             resp.send("Server is not working");
       }
});

module.exports = router;
