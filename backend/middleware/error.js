const ErrorHalders = require('../utils/ErrorHandlers');

module.exports=(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message= err.message || 'internal server Error';

    // wrong mongodb id error
    if(err.name==='CastError'){
        const message=`Resource not found . Invalid : ${err.path}`
        err= new ErrorHalders(message,400);
    }
    res.status(err.statusCode).json({
        succsess:false,
        error:err
    })  
}