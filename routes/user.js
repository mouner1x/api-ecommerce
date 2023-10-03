const express=require("express")
const { model, get } = require("mongoose")
const {validateobjectid,verifytokenandauth,verifytokenandadmin}=require("../middleware/validator")
const { getuser ,getalluser,updateuser,deleteuser} = require("../controller/user")
const router=express.Router()



router.put("/:id",validateobjectid,verifytokenandauth,updateuser)
router.delete("/:id",validateobjectid,verifytokenandauth,deleteuser)
router.get("/",verifytokenandadmin,getalluser)

router.get("/:id",validateobjectid,getuser)























module.exports={
    userpath:router
}