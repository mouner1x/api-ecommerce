const mongoose=require("mongoose")
const joi =require("joi")
const schema =mongoose.Schema;
const userschema =new schema({

    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        required:true,
        unique:true,
        type:String
    },
    password:{
        type:String,
        required:true
    },
    isadmin:{
        type:Boolean,
        default:false
    },



},{timestamps:true})



const usermodel =mongoose.model("user",userschema)


function validateloginuser(obj){

const schema =joi.object({


  
    email: joi.string().email().required(),
    
    password: joi.string().required(),


})

return schema.validate(obj)

}



function validateregisteruser(obj){

    const schema =joi.object({
    
    
        username: joi.string().required(),

        email: joi.string().email().required(),
        
        password: joi.string().required(),
    
    
    })
    
    return schema.validate(obj)
    
    }












    function validateupdateuser(obj){
        const schema =joi.object({

            username: joi.string(),

            email: joi.string().email(),
            
            password: joi.string(),
        
        })
        return schema.validate(obj)
    }




module.exports={
    usermodel,validateloginuser,validateregisteruser,validateupdateuser
}