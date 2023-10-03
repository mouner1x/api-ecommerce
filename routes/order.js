const express =require("express")
const router =express.Router()
const {createorder,updateorder,deleteorder,getorder,getallorder}=require("../controller/order")

const {verifytoken,verifytokenandadmin,verifytokenandauth}=require("../middleware/validator")

router.get("/",verifytokenandadmin,getallorder)
router.get("/:id",verifytokenandauth,getorder)
router.put("/:id",verifytokenandadmin,updateorder)
router.delete("/:id",verifytokenandadmin,deleteorder)
router.post("/",verifytoken,createorder)









module.exports={
    orderpath:router
}