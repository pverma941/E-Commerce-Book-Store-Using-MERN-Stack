const catchAsync = require('../middleware/catchAsync')
const stripe = require('stripe')('sk_test_51NAT2uSGooofyPr31JGB3oULXnE5Hj46P5O417YQn2HSGjk3ihdKOLHU14gtIrtO0fvvzD5gPFDYzu2gNhRfkNiA00h1eHQALL');

exports.processPayment= catchAsync(async (req,res,next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
          company: "Ecommerce",
        },
      });
    res.status(200).json({
    
        success:true,
        client_secret: myPayment.client_secret
    })
})
exports.sendStripeApiKey= catchAsync(async (req,res,next)=>{
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
})