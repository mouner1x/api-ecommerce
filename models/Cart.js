const mongoose=require("mongoose")
const joi =require("joi")
const schema =mongoose.Schema;

const cartschema =new schema({

 

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
]   






},{timestamps:true})


const cartmodel =mongoose.model("cart",cartschema)

function validatecreatecart(obj){

  const schema =joi.object({
    userid:joi.string().required(),

  })
     
return schema.validate(obj)
}





module.exports={
    cartmodel,validatecreatecart
}