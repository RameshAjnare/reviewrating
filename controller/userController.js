const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { config } = require("dotenv");
const User = require("../model/user_schema");
const { transporter, mailOptions } = require('../service/serviceMail');

const userSignup = async function (req, res) {
    const { email, password } = req.body;
     console.log("===>",email,password)
    const userData = new User(req.body)
    console.log("====>", userData);
    try {
        console.log('inside try');
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            return res.status(400).json({
                status: 400,
                error: "Email already exit"
            });
        }
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(password, salt);
        const filePath =`/uploads/${req.file.filename}`;
        userData.profilepic = filePath
        const addRes = await userData.save()
        return res.status(200).json({
            success: 200,
            massage: "Registation Success",
            token:token
        });
    } catch (err) {
        res.send('Error',err)
        console.log(err)
    }
}

/*const sendMail = async (req, res) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Email Sent Successfully" + info.response);
        }
    })
}*/

const userLogin = async (req, res) => {
    console.log("email && password")
    const { email, password } = req.body;
    try{
    if (email && password) {
        const checkUser = await User.findOne({ email: email })
        if (checkUser != null) {
                console.log("====>", checkUser.email, checkUser.password);
                const isMatch = await bcrypt.compare(password, checkUser.password)
                console.log(isMatch)
                if (checkUser.email === email && isMatch) {
                    const token = jwt.sign({userID:checkUser._id},  
                        process.env.JWT_SECRET_KEY,{expiresIn: '5d'} )
                    return res.status(200).json({
                        success: 200,
                        massage: "Login Success",
                        token: token
                    });
                } else {
                    res.send({ status: "failed", massage: "Password is not match" })
                }
            }else{
                res.send({ status: "failed", massage: "email user is not found" }) 
            }
        }
    }catch(err){
        res.send({ status: "errr", massage: err })  
    }    
}

const sendUserRestPasswordEmail = async (req,res) => {
    console.log('email=====>',req.body)
    const { email } = req.body;
    try{
       const userData = await User.findOne({email:email})
       console.log(userData)
       if(userData != null){
        const secret = userData._id + process.env.JWT_SECRET_KEY
        const token = jwt.sign({userID : userData._id},secret,{
            expiresIn : '5d'
        })
        const link = `http://127.0.0.1:3000/api/user/reset/${userData._id}/${token}`
        let info = await transporter.sendMail({
            from : "rajnare90@gmail.com", 
            to :"rajnare90@gmail.com",
            subject:"For Reset Your Password",
            text:`<a href=${link}>Click on this for reset password`
        })
       return res.status(200).json({
         status:"success",
         message:"email send succussfully",
         token:token,
         userid:userData._id
       })
       }else{
          res.send({ status: "failed", massage: "email user is not found" }) 
       }
    }catch(err){
        console.log(err)
    }
}

const  userPasswordRest = async (req,res) => {
    const {id,token} = req.params;
    const {newPassword,confirmPassword} = req.body;
    console.log(newPassword,confirmPassword)
    try{
        const checkUser = await User.findById(id) 
        console.log(checkUser);
         if(checkUser !=  null){
            console.log("if true then it work");
            /*const newToken = checkUser._id + token;
            const tokenVerify = jwt.verify(token,newToken)
            console.log('token===>',tokenVerify)
            console.log("=====");*/
            if(newPassword === confirmPassword){
            const salt = await bcrypt.genSalt(10);
            checkUser.password = await bcrypt.hash(confirmPassword, salt);
            await User.findByIdAndUpdate(checkUser._id, {$set: {password: confirmPassword}})
            res.send({ status: "Success", massage: "Password update Successfully"})
            }else{
                res.send({ status: "failed", massage: "Password and confirmPassword is not match" })
            }
         }else{
            res.send({ status: "failed", massage: "email user is not found" })
         }
         console.log("password change=====>",userDetails);
    }catch(error){
        res.send(error)
    }
}
module.exports = { userSignup, userLogin, 
    sendUserRestPasswordEmail ,userPasswordRest }