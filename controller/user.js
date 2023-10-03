const asyncHandler=require("express-async-handler")
const joi =require("joi")
const bcrypt=require("bcryptjs")
const jwt =require("jsonwebtoken")
const {validateupdateuser, usermodel}=require("../models/User")
const { model } = require("mongoose")


const getalluser =(asyncHandler(
    async (req,res)=>{

const users =await usermodel.find().select("-password")
res.status(200).json(users)


    }
))



const getuser =(asyncHandler(

async (req,res)=>{

    const user =await usermodel.findById(req.params.id)
    if(!user){
        return res.status(404).json({msg:"User Not Found"})
    }
    const {password,...other}=user._doc

    res.status(200).json(other)
    
    } 



))



const updateuser=(asyncHandler(
    async (req,res)=>{
            

const {error}=validateupdateuser(req.body)
if(error){
    return res.status(400).json({message:error.details[0]})

}

if(req.body.password){

const salt =await bcrypt.genSalt(6)
req.body.password=await bcrypt.hash(req.body.password,salt)

}

const updateuser =await usermodel.findByIdAndUpdate(req.params.id,{
    $set:{
            username:req.body.username,
            password:req.body.password,
            email:req.body.email
    }
},{new:true}).select("-password")

res.status(200).json(updateuser)

    }
))





const deleteuser=(asyncHandler(
async (req,res)=>{

  
    const user=await usermodel.findById(req.params.id)
    if(!user){
        return res.status(404).json({msg:"User Not Found"})
    }
    await usermodel.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"User Has Been Deleted"})



}

))


module.exports={
    getuser,updateuser,deleteuser,getalluser
}