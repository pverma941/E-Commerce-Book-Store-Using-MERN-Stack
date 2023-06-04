const ErrorHalders = require('../utils/ErrorHandlers');
const catchAsync = require('../middleware/catchAsync');
const User = require('../models/UserModel');
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const cloudinary = require('cloudinary')

// User Registration
exports.registerUser =  catchAsync(async (req,res,next)=>{
    const {name,email,password} = req.body ;

    const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
    })
    const user = await User.create({
        name, 
        password,
        email,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    })

    sendToken(user,201,res)
    // const token = user.getJWTToken()
    // res.status(201).json({
    //     success:true,
    //     token
    // })
})

// User Login
exports.LoginUser = catchAsync(async (req,res,next)=>{
    const {email,password}= req.body;

    if(!email || !password){
        return next(new ErrorHalders('Please Enter Email and Password',400));
    }

    const user = await User.findOne({email}).select("+password")   // we have to select the password becaouse when we created the model then there we put password as selected:false

    if(!user){
        return next(new ErrorHalders("Invalid Credentials",401))
    }

    const isPasswordMatch = await user.ComparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHalders("Invalid Credentials",401))
    }

    sendToken(user,200,res);
    // const token = user.getJWTToken();

    // res.status(200).json({
    //     success:true,
    //     token,
    // })
})

// Logout
exports.Logout = catchAsync(async (req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message : "Logout"
    })
})

// Forget Password

exports.forgetPassword = catchAsync(async (req,res,next)=>{
    const user = await User.findOne({email:req.body.email})

    if(!user){
        return next(new ErrorHalders("User not found",404))
    }

    // getting a token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you not requested this email then please ignore this email`;
     
    try{
        await sendEmail({
            email:user.email,
            subject:'password recovery',
            message
        });
        res.status(200).json({
            success:true,
            message:`email send to your ${user.email} successfully`
        })
    }catch{
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHalders(error.message,500))
    }
})


// get user detail
exports.getUserDetail = catchAsync(async (req,res,next)=>{

    // when any user login then there we save his/her all the details in req.user so here we can access it.
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })
})

// update/change the Password.
exports.UserPasswordUpdate = catchAsync(async (req,res,next)=>{

    // when any user login then there we save his/her all the details in req.user so here we can access it.
    const user = await User.findById(req.user.id).select('+password');

    const isPasswordMatch = await user.ComparePassword(req.body.oldPassword);

    if(!isPasswordMatch){
        return next(new ErrorHalders("Invalid old password",401))
    }

    if(req.body.newPassword != req.body.confirmPassword){
        return next(new ErrorHalders("password does not match",402))
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user,200,res);
})

// update user Profile 
exports.UpdateUserProfile =catchAsync(async (req,res,next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
      };
      if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        const ans=await cloudinary.v2.uploader.destroy(imageId);
    console.log(ans)
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    
      const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    res.status(200).json({
        success:true
    })
})

// --admin
exports.getAllUsers = catchAsync(async (req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
})

// get single user detaile -- admin
exports.getSingleUser = catchAsync(async (req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHalders("User not found",))
    }
    res.status(200).json({
        success:true,
        user
    })
})

// update user role 
exports.UpdateUserRole =catchAsync(async (req,res,next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true
    })
})

// delete user -- admin
exports.DeleteUser =catchAsync(async (req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHalders("User not found",))
    }

    const ImageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(ImageId)
    await user.remove();
    res.status(200).json({
        success:true
    })
})