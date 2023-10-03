const asyncHandler=require("express-async-handler")
const {cartmodel,validatecreatecart}=require("../models/Cart")


const createcart =(asyncHandler(
    async (req,res)=>{
        
        const newcart = await new cartmodel(
        req.body
        )
        const savecart =await newcart.save()
        res.status(200).json(savecart)
    }
 

))

const updatecart = (asyncHandler(
    async (req,res)=>{
        const updatecarts =await cartmodel.findByIdAndUpdate(req.params.id,{
            $set:{


                userid:req.body.userid,
                products:req.body.products

            }
        },{new:true})
        res.status(200).json(updatecarts)
    }
))


const deletecart =(asyncHandler(
    async (req,res)=>{
        await cartmodel.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart Has Been Deleted")
    }
))


const getcart =(asyncHandler(
    async (req,res)=>{
        const cart =await cartmodel.findOne({userid:req.params.id})
        res.status(200).json(cart)
    }
))


const getallcart =(asyncHandler(
    async (req,res)=>{
       const carts = await cartmodel.find()
       res.status(200).json(carts)
    }
))





module.exports={
     createcart,updatecart,deletecart,getcart,getallcart
}