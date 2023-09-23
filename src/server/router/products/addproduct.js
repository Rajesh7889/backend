const express = require("express");
const bcrypt = require("bcrypt");
require("../../../db/configration");
const Items = require("../../../db/Productmodel");
const router = express.Router();
const multer = require("multer");


const storage = multer.diskStorage({
                                     destination: function (req, file, cb) {
                                                cb(null, "../frontend/src/images/");
                                           },
                                     filename: function (req, file, cb) {
                                                 const uniqueSuffix = Date.now();
                                                 cb(null, uniqueSuffix + file.originalname);
                                         },
                                   }
              );

const upload = multer({ storage: storage });

router.post("/add-product", upload.single("img"), async (req, resp) => {
                 const obj = Object.assign({}, req.body)
                 try {
                       const data = new Items({
                                                    name: obj.name,
                                                    price: obj.price,
                                                    userId: obj.userId,
                                                    company: obj.company,
                                                    category: obj.category,
                                                    categorytitle: obj.categoryTitle,
                                                    about: obj.about,
                                                    img: req.file.filename,
                                                    subcat: obj.subcat,
                                                    subcatcod: obj.subcatcod,
                                         });
                        const result = await data.save();
                        result ? resp.send(result) : resp.send(false);
                 } catch (err) {
                       resp.send("Server is not working");
                 }
});

module.exports = router;
