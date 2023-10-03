const express =require("express")
const router =express.Router()
const {createproduct,updateproduct,getallproduct,getproduct}=require("../controller/product")
const {verifytokenandadmin}=require("../middleware/validator")
const { updateuser } = require("../controller/user")



router.post("/",verifytokenandadmin,createproduct)
router.put("/:id",verifytokenandadmin,updateproduct)

router.get("/",getallproduct)
router.get("/:id",getproduct)













module.exports={
    productpath:router
}