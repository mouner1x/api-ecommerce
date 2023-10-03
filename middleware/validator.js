const mongoose=require("mongoose")
const jwt =require("jsonwebtoken")
const validateobjectid=(req,res,next)=>{
if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    return res.status(400).json({msg:"Invalid Id"})
}
next()


}



const verifytoken =(req,res,next)=>{

    const authtoken =req.headers.token
    if (!authtoken) {
        return res.status(401).json({ msg: "No Token Provided, Please Login" });
      }
     

      try {
        const token = authtoken.split(" ")[1];
        const decoded = jwt.verify(token, "MOX123456789"); // Verify the token with your secret key
    
        req.user = decoded;
        next();
      } catch (err) {
        return res.status(401).json({ msg: "Invalid Token" });
      }
    }
    



const verifytokenandauth =(req,res,next)=>{
  
 
    verifytoken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isadmin){
            next()
        }
        else{
            res.status(403).json("You Are Not Allowed To Do That")
        }
    })

     
}


const verifytokenandadmin =(req,res,next)=>{
  
 
    verifytoken(req,res,()=>{
        if(req.user.isadmin){
            next()
        }
        else{
            res.status(403).json("You Are Not Allowed To Do That")
        }
    })

     
}








module.exports={
    validateobjectid,verifytokenandauth,verifytokenandadmin,verifytoken
}