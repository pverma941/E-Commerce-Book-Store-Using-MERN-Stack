const app = require('./app');
const dotenv = require('dotenv');
const dbconnect=require('./config/dbConnection')


//handling uncaught error
process.on('uncaughtException',(err)=>{
    console.log(`Error:${err.message}`);
    console.log('sutting doun the server due to unhandled promise rejection');
    process.exit(1);
})
//link to config folder
dotenv.config({path:'backend/config/config.env'})

// database connection calling
dbconnect();
//uncaught error example
// console.log(cricket);
const server = app.listen(process.env.PORT,()=>{

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