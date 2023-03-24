const express = require('express');
const { getAllproduct, createprodut, updateProduct, deleteproduct ,getSingleProductDetail} = require('../Controllers/productcontroler');

const router= express.Router();

// view route
router.route('/product').get(getAllproduct)
//add product route
router.route('/product/new').post(createprodut)
//update route and delete product route
router.route('/product/:id').put(updateProduct).delete(deleteproduct).get(getSingleProductDetail)
module.exports = router;