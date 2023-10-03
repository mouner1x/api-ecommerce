
const express=require("express")
const router=express.Router()
const {registeruser,loginuser}=require("../controller/auth")






router.post("/register",registeruser)
router.post("/login",loginuser)

























module.exports={
    authpath:router
}