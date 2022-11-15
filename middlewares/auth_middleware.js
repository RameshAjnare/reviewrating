const jwt = require('jsonwebtoken')
const User = require('../model/user_schema')

const checkUserAuth = async (req,res, next) =>{
let token;
const {authorization} = req.headers;
console.log("===>auth",authorization)
if(authorization && authorization.startsWith("Bearer")){
    try{
        token = authorization.split(" ")[1];
        console.log('token',token);
        console.log('Athorization: ',authorization)
        //verify user from Token
        const {userID} = jwt.verify(token,process.env.JWT_SECRET_KEY);
        //Get User from Token
        req.user = await User.findById(userID).select('-password');
        next()
    }catch(err){
      console.log(err);
      res.status(401).send({ status:"failed", message:"Unauthorized User"});
    }
}
if(!token){
 res.status(401).send({"message" : "Unauthorized User No Token"})   
}
}

module.exports = {checkUserAuth};