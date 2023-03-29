const productModel = require('../models/productModel');
const ErrorHalders = require('../utils/ErrorHandlers');
const catchAsync = require('../middleware/catchAsync');
const ApiFeaturs = require('../utils/apiFeaturs');


// create a product   -- only admin can add the products
exports.createproduct = catchAsync(async (req,res,next)=>{
    const product = await new productModel(req.body);
    const result = await product.save();
    res.status(201).json({
        success:true,
        product
    });
});


// View a products
exports.getAllproduct=catchAsync(async (req,res)=>{
    const itemPerpage = 5;
    const productCount = await productModel.countDocuments();
    // making a new instance of ApiFeaturs which will take two argument and query and query String 
    // and do the operation on it like search , filter , pagination.
    const newapiFeaturs = new ApiFeaturs(productModel.find(),req.query)
    newapiFeaturs.search()
    newapiFeaturs.filter();
    newapiFeaturs.pagination(itemPerpage)
    const newproduct = await newapiFeaturs.query;

    res.status(200).json({
        success : true,
        newproduct,
        productCount
    })
});


// getting a single product details
exports.getSingleProductDetail=catchAsync(async (req,res,next)=>{
    const product = await productModel.findById(req.params.id);

    if(!product){
        return next(new ErrorHalders("product not found",404))
    }

    res.status(200).json({success:true,product});
});


// update a product   -- only admin can do update
exports.updateProduct=catchAsync(async (req,res,next)=>{
    let product = await productModel.findById(req.params.id);

    if(!product){
        return next(new ErrorHalders("product not found...",404))
    }

    product = await productModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })
});


// delete a product   -- only admin can do it .
exports.deleteproduct = catchAsync(async (req,res,next)=>{
    let product = await productModel.findById(req.params.id);
    if(!product){
        return next(new ErrorHalders("product not found...",404))
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })
});