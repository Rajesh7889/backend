const express = require("express");
const router = express.Router();
const {userexistornot,
       neworderaddress,
       updateProfile,
       updatePassword,
       updatefavAndMyCardlist,
       signup,questions,
       login,OrdrAdrsActiv,
       userfavandMycard,
       deleteAddress}=require("../controlers/usercontrols")

 router.route("/update-order-address/:id").put(neworderaddress)
 router.route("/checkemailUser/:email").post(userexistornot)
 router.route("/update-my-profile/:id").put(updateProfile)
 router.route("/update-password/:id").put(updatePassword)
 router.route('/user/get-products/:like/:id').post(userfavandMycard)
 router.route('/user/product/:type/:userId/:productId').put(updatefavAndMyCardlist)
 router.route("/registration").post(signup)
 router.route("/login").post(login)
 router.route("/is-activeordr-address/:adrsId").put(OrdrAdrsActiv)
 router.route("/deleteAddress/:userId/:adrsId").put(deleteAddress)
 router.route("/questions").post(questions)

module.exports = router;