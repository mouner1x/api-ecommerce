const mongoose=require("mongoose")
const joi =require("joi")
const schema =mongoose.Schema;
const productschema =new schema({

    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        required:true,
        type:String
    },
    image:{
        type:String,
    },
    categories:{
        type:Array,
    },
    size:{
        type:String,
    },
    color:{
        type:String,
    },
    price:{
        type:String,
        required:true
    }
    


},{timestamps:true})



const productmodel =mongoose.model("product",productschema)



function validatecreateproduct(obj){

const schema =joi.object({
  
title: joi.string().required(),
  description: joi.string().required(),
  image: joi.string(),
  categories: joi.array(),
  size: joi.string(),
  color: joi.string(),
  price: joi.string().required(),


})
 
 return schema.validate(obj)
}




function validateupdateproduct(obj){
    const schema =joi.object({
        title: joi.string(),
        description: joi.string(),
        image: joi.string(),
        categories: joi.array(),
        size: joi.string(),
        color: joi.string(),
        price: joi.string()
      
      
    })
    return schema.validate(obj)
}





module.exports={
    productmodel,validatecreateproduct,validateupdateproduct
}