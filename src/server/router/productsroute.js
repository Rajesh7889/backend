const express = require("express");
const router = express.Router();


const {authJwt,addnewproduct,allproduct,
       searchproduct,deleteproduct,sellerproducts,
       updateproductdetals,searchsellerproducts,
       productdetails,productBycategories,
       productBysubcaetgories,addReview}=require("../controlers/productscontroler")


router.route("/add-product").post(addnewproduct)
router.route("/all-products/:type").get(allproduct)
router.route("/delete-product/:id").delete(deleteproduct)
router.route("/lists").get(authJwt,sellerproducts)
router.route("/search-myproduct/:key").get(authJwt,searchsellerproducts)
router.route("/categorical-search/:code").get(productBycategories)
router.route("/get-products-details/:id").get(productdetails)
router.route("/subcateries-search/:cat/:subcat").get(productBysubcaetgories)
router.route("/categorical-search/itm/:key").get(searchproduct)
router.route("/update-product/:id").put(updateproductdetals)
router.route("/add-product-review/:id").post(addReview)


module.exports = router;