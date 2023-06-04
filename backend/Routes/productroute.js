const express = require('express');
const { getAllproduct, createproduct, updateProduct, deleteproduct ,getSingleProductDetail, createProductReview, getAllReviews, deleteReviews, getAllAdminProduct} = require('../Controllers/productcontroler');
const { isAuthenticatedUser, authorizedRole } = require('../middleware/auth');

const router= express.Router();

// view route
router.route('/products').get(getAllproduct)
// view all product for admin
router.route("/admin/products").get(isAuthenticatedUser,authorizedRole("admin"), getAllAdminProduct)
//add product route
router.route('/admin/product/new').post(isAuthenticatedUser,authorizedRole("admin"),createproduct)
//update route and delete product route
router.route('/admin/product/:id')
    .put(isAuthenticatedUser,authorizedRole("admin"),updateProduct)
    .delete(isAuthenticatedUser,authorizedRole("admin"),deleteproduct)
    
router.route('/product/:id').get(getSingleProductDetail)

// for reviews
router.route('/review').put(isAuthenticatedUser,createProductReview);
router.route('/reviews').get(getAllReviews).delete(isAuthenticatedUser,deleteReviews)
module.exports = router;