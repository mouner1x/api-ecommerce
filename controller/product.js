
const asyncHandler=require("express-async-handler")

const {validatecreateproduct,productmodel,validateupdateproduct}=require("../models/Product");
const user = require("../routes/user");



const createproduct =(asyncHandler(

    async (req,res)=>{
        const {error}=validatecreateproduct(req.body)
        if(error){
            return res.status(400).json(error.details[0].message);
        }
        const product =await productmodel.create({
            title:req.body.title,
            description:req.body.description,
            image:req.body.image,
            categories:req.body.categories,
            size:req.body.size,
            color:req.body.color,
            price:req.body.price,

        })
    res.status(201).json(product)
    }
))

const updateproduct=(asyncHandler(
    
    async (req,res)=>{

        const {error}=validateupdateproduct(req.body)
        if(error){
            return res.status(400).json({message:error.details[0]})
        
        }
        
        const updateproduct =await productmodel.findByIdAndUpdate(req.params.id,{
            $set:{
                title:req.body.title,
                description:req.body.description,
                image:req.body.image,
                categories:req.body.categories,
                size:req.body.size,
                color:req.body.color,
                price:req.body.price,
    
        }},{new:true})
        
        res.status(200).json(updateproduct)

    }
))
const getallproduct =(asyncHandler(
    async (req,res)=>{
        const qnew =req.query.qnew
        const qcatrgory =req.query.qcatrgory
        let products;
        if(qnew){
            products=await productmodel.find().sort({createdAt:-1}).limit(1)
        }
        else if(qcatrgory){
            products =await productmodel.find({categories:{
                $in:[qcatrgory]
            }})
        }else{
            products =await productmodel.find()
        }
        res.status(200).json(products)
    }
))

const getproduct=(asyncHandler(
     async (req,res)=>{

     const product =await productmodel.findById(req.params.id)
     if(!product){
        return res.status(404).json("Product Not Found")

     }
     res.status(200).json(product)

    }
))




module.exports={
    createproduct,updateproduct,getallproduct,getproduct
}