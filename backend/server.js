const app = require('./app')
const cloudinary = require('cloudinary')
const dbconnect=require('./config/dbConnection')


//handling uncaught error
process.on('uncaughtException',(err)=>{
    console.log(`Error:${err.message}`);
    console.log('sutting doun the server due to unhandled promise rejection');
    process.exit(1);
})
//link to config folder
if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config({path:'backend/config/config.env'})
}


// database connection calling
dbconnect();  

// cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

//uncaught error example
// console.log(cricket);
const port = parseInt(process.env.PORT)
const server = app.listen(port,()=>{ 
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})
// haldligh promise rejecttion
process.on('unhandledRejection',(err)=>{
    console.log(`Error ; ${err.message}`);
    console.log('sutting doun the server due to unhandled promise rejection');

    server.close(()=>{ 
        process.exit(1);
    });
})