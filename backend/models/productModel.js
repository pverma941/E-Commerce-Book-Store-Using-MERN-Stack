const mongoose= require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter product name'],
        trim:true
    },
    description:{
        type:String,
        required:[true,'please enter description']
    },
    price:{
        type:Number,
        required:[true,'please enter product price'],
        maxLength:[8,"price cannote exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    image:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,'enter product category']
    },
    stock:{
        type:Number,
        required:[true,'please enter product stoke'],
        maxLength:[3,'stock cannot exceed 8 characters'],
        default:1
    },
    numOfReviwes:{
        type:Number,
        default:0
    },
    reviwes:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('product',productSchema)