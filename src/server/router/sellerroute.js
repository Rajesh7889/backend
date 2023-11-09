const express = require("express");
const router = express.Router();
const {newseller,getSeller,Selleremailcheck}=require('../controlers/sellercontroler')

router.route("/register-seller").post(newseller)
router.route("/checkemailSeller/:email").post(Selleremailcheck)
router.route("/getUser/:id").post(getSeller)
module.exports = router;