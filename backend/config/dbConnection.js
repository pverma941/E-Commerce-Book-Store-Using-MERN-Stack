const mongoose=require('mongoose');

const dbconnect=()=>{
    mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log(`mongodb server connected with : ${data.connection.host}`)
      })
}
module.exports=dbconnect;