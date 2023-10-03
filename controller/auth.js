const asyncHandler=require("express-async-handler")
const joi =require("joi")
const bcryptjs =require("bcryptjs")
const {usermodel,validateregisteruser,validateloginuser}=require("../models/User")
const jwt =require("jsonwebtoken")


//register user

const registeruser=(asyncHandler(

    async (req,res)=>{
     
         const {error}=validateregisteruser(req.body)
         if(error){
            return res.status(400).json(error.details[0].message);

         }

        const user =await usermodel.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({msg:"User Already Exist,Please login"})
        }

        const salt =await bcryptjs.genSalt(6)
        req.body.password=await bcryptjs.hash(req.body.password,salt)

        const newuser = await new usermodel({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email
        })
 
     await newuser.save()

     res.status(201).json({msg:"You Registerd Successfully,Please Login"})



    
    }

))



//login user 
const loginuser =(asyncHandler(

async (req,res)=>{
const {error}=validateloginuser(req.body)
if(error){
    return res.status(400).json(error.details[0].message);
}
const user =await usermodel.findOne({email:req.body.email})
if(!user){
    return res.status(400).json({msg:"Invalid Email Or Password"})

}


const passwordmatch =await bcryptjs.compare(req.body.password,user.password)
if(!passwordmatch){
    return res.status(400).json({msg:"Invalid Email Or Password"})
}

 const token = await jwt.sign({id:user._id,isadmin:user.isadmin},"MOX123456789",{expiresIn:"1d"})

const {password,...result}=user._doc

res.status(200).json({...result,token})


}

))



module.exports={
    registeruser,loginuser
}