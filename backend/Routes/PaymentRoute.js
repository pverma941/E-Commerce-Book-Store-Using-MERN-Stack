const express=require('express')

const {isAuthenticatedUser} = require('../middleware/auth');
const { processPayment, sendStripeApiKey } = require('../Controllers/PaymentController');
const router=express.Router();

router.route("/payment/process").post(isAuthenticatedUser,processPayment);
router.route("/stripeApiKey").get(isAuthenticatedUser,sendStripeApiKey);

module.exports=router;