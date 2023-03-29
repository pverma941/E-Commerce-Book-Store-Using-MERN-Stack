const express = require('express');
const { getAllproduct, createproduct, updateProduct, deleteproduct ,getSingleProductDetail} = require('../Controllers/productcontroler');

const router= express.Router();

// view route
router.route('/product').get(getAllproduct)
//add product route
router.route('/product/new').post(createproduct)
//update route and delete product route
router.route('/product/:id').put(updateProduct).delete(deleteproduct).get(getSingleProductDetail)
module.exports = router;