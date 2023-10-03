const express=require("express")
const morgn =require("morgan")
const dotenv=require("dotenv")
const {dbconnect}=require("./config/dbconnect")
const {authpath}=require("./routes/auth")
const { userpath } = require("./routes/user")
const {cartpath}=require("./routes/cart")
const {productpath}=require("./routes/product")
const {orderpath}=require("./routes/order")
dotenv.config({path:"config.env"})

const port =process.env.port
const app=express()



dbconnect()


app.use(express.json())
app.use(morgn("dev"))






app.use("/api/auth",authpath)
app.use("/api/user",userpath)
app.use("/api/product",productpath)
app.use("/api/cart",cartpath)
app.use("/api/order",orderpath)































app.listen(port,()=>{
console.log(`server runing on port ${port}`)
})

