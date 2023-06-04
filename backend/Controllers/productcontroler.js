const productModel = require('../models/productModel');
const ErrorHalders = require('../utils/ErrorHandlers');
const catchAsync = require('../middleware/catchAsync');
const ApiFeaturs = require('../utils/apiFeaturs');
const cloudinary = require('cloudinary')

// create a product   -- only admin can add the products
exports.createproduct = catchAsync(async (req,res,next)=>{
    let image=[];
    if(typeof req.body.image === "string"){
        image.push(req.body.image)
    }else{
        image=req.body.image
    }

    // for url of images
    let imagesLink=[];
    for (let i = 0; i < image.length; i++) {
        const result=await cloudinary.v2.uploader.upload(image[i],{
            folder:"products"
        })

        imagesLink.push({
            public_id:result.public_id,
            url:result.secure_url
        })
        
    }
    req.body.image=imagesLink;
    
    // when any user login then we have save req.user that we transfer here in req.body.user
    req.body.user=req.user.id

    const product = await new productModel(req.body);
    const result = await product.save();
    res.status(201).json({
        success:true,
        product
    });
});


// View a products
exports.getAllproduct=catchAsync(async (req,res)=>{

    // cheking alert from frontend
    // return next(new ErrorHalders("this my temp error",404));
    const resultPerPage = 8;
    const productsCount = await productModel.countDocuments();
    // making a new instance of ApiFeaturs which will take two argument and query and query String 
    // and do the operation on it like search , filter , pagination.
    const newapiFeaturs = new ApiFeaturs(productModel.find(),req.query)
    newapiFeaturs.search();
    newapiFeaturs.filter();

    // let products = await newapiFeaturs.query;

  // let filterProductsCount = products.length;

  newapiFeaturs.pagination(resultPerPage);

  const products = await newapiFeaturs.query;

    res.status(200).json({
        success : true,
        products,
        productsCount,
        resultPerPage,
        // filterProductsCount
    })
});
// get all product -- for admin
exports.getAllAdminProduct=catchAsync(async (req,res)=>{
    const products = await productModel.find();
    res.status(200).json({
        success : true,
        products,
       
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
    let image=[];
    if(typeof req.body.image === "string"){
        image.push(req.body.image)
    }else{
        image=req.body.image
    }
    if(image!==undefined){
        for (let i = 0; i < product.image.length; i++) {
            const result=await cloudinary.v2.uploader.destroy(product.image[i].public_id)
        }
        // for url of images
        const imagesLink=[];
        for (let i = 0; i < image.length; i++) {
            const result=await cloudinary.v2.uploader.upload(image[i],{
                folder:"products"
            })  

        imagesLink.push({
            public_id:result.public_id,
            url:result.secure_url
        })
        
        }
        req.body.image=imagesLink;
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
    // deleting product from cloudinary
    for (let i = 0; i < product.image.length; i++) {
        const result=await cloudinary.v2.uploader.destroy(product.image[i].public_id)
        
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })
});

// Create new Review or Update a review
exports.createProductReview = catchAsync(async (req,res,next)=>{
    const {rating,comment,productId} = req.body;
    const reviwe ={
        user : req.user._id,
        name: req.user.name,
        rating:Number(rating),
        comment,
        
    }
    // console.log(reviwe.user,req.user._id);
    const product = await productModel.findById(productId);

    const isReviewed = product.reviwes.find(
         (rev)=> rev.user.toString() === req.user._id.toString()
    );
    if(isReviewed){
        product.reviwes.forEach((rev)=>{
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating=rating,
                rev.comment=comment
            }
        })
    }else{
        product.reviwes.push(reviwe);
        product.numOfReviwes=product.reviwes.length;
    }
    
    // for all rating lets calculate average of all and store it into ratings
    let avg=0;
    product.reviwes.forEach(rev=>{
        avg+=rev.rating
    })
    product.ratings=avg/product.reviwes.length;


    await product.save({
        validateBeforeSave:false,

    })

    res.status(200).json({
        success:true,
    })
})

// Get all Review Of Product 
exports.getAllReviews = catchAsync(async (req,res,next)=>{
    const product = await productModel.findById(req.query.id);
    if(!product){
        return next(new ErrorHalders("product not found...",404))
    }
    res.status(200).json({
        success:true,
        reviwes:product.reviwes,
    })
})

// Delete Review 
exports.deleteReviews = catchAsync(async (req,res,next)=>{
    const product = await productModel.findById(req.query.productId);
    if(!product){
        return next(new ErrorHalders("product not found...",404))
    }

    // filtering the revies which we have to not delete
    const reviwes = product.reviwes.filter(
        (rev)=> rev._id.toString() !== req.query.id.toString()
    );

    let avg=0;
    reviwes.forEach(rev=>{
        avg+=rev.rating
    })
    const ratings=avg/reviwes.length;
    const numOfReviwes=reviwes.length;

    await productModel.findByIdAndUpdate(req.query.productId,{
        reviwes,
        ratings,
        numOfReviwes
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
    })
})