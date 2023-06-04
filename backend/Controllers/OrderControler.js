const ErrorHalders = require('../utils/ErrorHandlers');
const catchAsync = require('../middleware/catchAsync');
const OrderModel = require('../models/OrderModel');
const productModel = require('../models/productModel');
exports.newOrder= catchAsync(async (req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shipingPrice,
        totalPrice
    } = req.body;

    const order= await OrderModel.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shipingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })

    res.status(201).json({
        success:true,
        order
    })
})


// get single order
exports.GetSingleOrder=catchAsync(async(req,res,next)=>{
    // through findById it will find a id and then using populate it will goes to user collection and find name and email .
    const order =await  OrderModel.findById(req.params.id).populate("user","name email")

    if(!order){
        return next(new ErrorHalders("Order not found",404));
    }

    res.status(200).json({
        success:true,
        order
    })
})

// get loged in user  orders
exports.myOrders=catchAsync(async(req,res,next)=>{

    const orders = await OrderModel.find({user:req.user._id})
    
    res.status(200).json({
        success:true,
        orders
    })
})

// get all orders --Admin
exports.getAllOrders=catchAsync(async(req,res,next)=>{
    
    const orders = await OrderModel.find()

    let totalAmount =0;
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice;
    })
    
    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})
// Update Order Status -- Admin
exports.updateOrderStatus=catchAsync(async (req,res,next)=>{
  
    const order = await OrderModel.findById(req.params.id);

    if(!order){
        return next(new ErrorHalders("Order not found",404));
    } 
    
    if(order.orderStatus==="Delivered"){
        return next(new ErrorHalders("You have already deliverd this order",400));
    }
    
    // if we have delivered any product than we have to update the Stocks...
    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (order)=>{
            await updateStock(order.product,order.quentity)
        })
    }

    order.orderStatus=req.body.status;
    if(req.body.status==="Delivered"){
        order.deliverAt=Date.now();
    }

    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true
    })
})
async function updateStock(pid,quentity){
    const product = await productModel.findById(pid);

    product.stock-=quentity;
    await  product.save({validateBeforeSave:false})
}

exports.deleteOrders=catchAsync(async(req,res,next)=>{
    
    const order = await OrderModel.findById(req.params.id)

    if(!order){
        return next(new ErrorHalders("Order not found",404));
    }

    await order.remove();   
    
    res.status(200).json({
        success:true,
        
    })
})
