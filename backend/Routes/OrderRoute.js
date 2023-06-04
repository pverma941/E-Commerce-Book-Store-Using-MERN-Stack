const express = require('express');
const router= express.Router();
const { isAuthenticatedUser, authorizedRole } = require('../middleware/auth');
const { newOrder, GetSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrders } = require('../Controllers/OrderControler');
 
router.route("/order/new").post(isAuthenticatedUser,newOrder);
router.route("/order/:id").get(isAuthenticatedUser,GetSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser,myOrders);

router.route("/admin/orders").get(isAuthenticatedUser,authorizedRole("admin"),getAllOrders);
router.route("/admin/order/:id")
    .put(isAuthenticatedUser,authorizedRole("admin"),updateOrderStatus)
    .delete(isAuthenticatedUser,authorizedRole("admin"),deleteOrders)

module.exports=router;