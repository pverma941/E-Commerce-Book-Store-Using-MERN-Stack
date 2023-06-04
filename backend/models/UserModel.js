const mongoose = require('mongoose');
const validator =  require('validator');
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        maxLength:[30,"name length cannot exceed 30 character"],
        minLength:[4,"name length should be greater than 4"]
    },
    email:{
        type:String,
        required:[true,"please enter Mail id"],
        unique:true,
        validate:[validator.isEmail,"please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter password"],
        minLength:[8,"password must be grater than 8 character"], 
        select:false   // it means when we apply find methode then we can able to access password.
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
        
    },
    role:{
        type:String,
        default:"user", 
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

UserSchema.pre("save", async function (next){

    if(!this.isModified("password")){
        next(); 
    } 
    this.password = await bcrypt.hash(this.password,10);
})

UserSchema.methods.getJWTToken=function (){
    // we are creating jwt toKen by assigning id , secretkey,expiretime
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}   
// comparing Password 
UserSchema.methods.ComparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

// Generating password reset token
UserSchema.methods.getResetPasswordToken = function(){
    // Generating token 
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')

    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}
module.exports = mongoose.model("User",UserSchema);