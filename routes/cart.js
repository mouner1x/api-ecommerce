const express=require("express")
const router =express.Router()
const {verifytoken,verifytokenandadmin,verifytokenandauth}=require("../middleware/validator")
const {createcart,updatecart,deletecart,getcart,getallcart}=require("../controller/cart")


router.get("/",verifytokenandadmin,getallcart)
router.get("/:id",verifytokenandauth,getcart)
router.put("/:id",verifytokenandauth,createcart)
router.delete("/:id",verifytokenandauth,deletecart)
router.post("/",verifytoken,createcart)












module.exports={
    cartpath:router
}