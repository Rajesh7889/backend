const express = require("express");
const router = express.Router();
const {neworder,myorders,cancelorder}=require("../controlers/ordercontrolers")

router.route('/order').post(neworder)
router.route('/myorders/:id/:limit?').get(myorders)
router.route('/cancelorder/:id').put(cancelorder)

module.exports = router;