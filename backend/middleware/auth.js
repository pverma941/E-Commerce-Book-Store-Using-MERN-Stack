const catchAsync = require('./catchAsync')
const ErrorHalders = require('../utils/ErrorHandlers')
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')
exports.isAuthenticatedUser = catchAsync( async (req,res,next)=>{
    const {token} = req.cookies;
    // console.log(token);
    if(!token){
        return next(new ErrorHalders("Login First to access the resourc ",401,));
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET)

    // we save the user data into req.user so jabtak token rahega user login hi rahega 
    // or user jab tak login rahega tabtak hum req mese user ka data access kar sakte he
    req.user = await User.findById(decodedData.id);
    // we are calling next here becouse we want to execute next thing after user is authenticated
    next()
})
exports.authorizedRole= (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHalders(`Roles:${req.user.role} is not allowed to access this resource`,403))
        }
        next();
    }
}