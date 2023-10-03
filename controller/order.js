const asyncHandler=require("express-async-handler")
const {ordermodel}=require("../models/Order")


const createorder =(asyncHandler(
    async (req,res)=>{
        
        const neworder = await new ordermodel(req.body)
        const saveorder =await neworder.save()
        res.status(200).json(saveorder)
    }
 

))



const updateorder = (asyncHandler(
    async (req,res)=>{
        const updateorder=await ordermodel.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateorder)
    }
))


const deleteorder =(asyncHandler(
    async (req,res)=>{
        await ordermodel.findByIdAndDelete(req.params.id)
        res.status(200).json("Order Has Been Deleted")
    }
))


const getorder =(asyncHandler(
    async (req,res)=>{
        const order =await ordermodel.find({userid:req.params.id})
        res.status(200).json(order)
    }
))


const getallorder =(asyncHandler(
    async (req,res)=>{
       const orders = await ordermodel.find()
       res.status(200).json(orders)
    }
))






module.exports={
    createorder,updateorder,deleteorder,getorder,getallorder
}