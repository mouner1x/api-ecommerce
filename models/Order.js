const mongoose=require("mongoose")
const joi =require("joi")
const schema =mongoose.Schema;
const orderschema =new schema({

    userid:{
            type:String,
            required:true
    },
    products:[
        {
            productid:{
                type:String
            },
            quantity:{
                type:Number,
                default:1
        
        }
        }
    ],
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"pending"},
    
    },{timestamps:true})



const ordermodel =mongoose.model("order",orderschema)







module.exports={
    ordermodel
}