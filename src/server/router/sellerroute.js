const express = require("express");
const router = express.Router();
const {newseller}=require('../controlers/sellercontroler')

router.route("/seller").post(newseller)

module.exports = router;