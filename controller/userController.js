const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { config } = require("dotenv");
const User = require("../model/user_schema");
const { transporter, mailOptions } = require('../service/serviceMail');

//User Siginup API
const userSignup = async function (req, res) {
    const { email, password } = req.body;
    const userData = new User(req.body)
    try {
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            return res.status(400).json({
                status : 400,
                error : "Email already exit"
            });
        }
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(password, salt);
        const filePath =`/uploads/${req.file.filename}`;
        userData.profilepic = filePath
        const addRes = await userData.save()
        return res.status(200).json({
            success : 201,
            massage : "Registation Success",
        });
    } catch (err) {
        res.send('Error',err)
        console.log(err)
    }
}

//User Login API
const userLogin = async (req, res) => {
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
                        success : 200,
                        massage : "Login Success",
                        token : token
                    });
                } else {
                    res.send({ status: "failed", massage: "Password is not match" })
                }
            }else{
                res.send({ status: "failed", massage: "email user is not found" }) 
            }
        }
    }catch(err){
        res.send({ status : "errr", massage: err })  
    }    
}

//User Send Email for Reset Password API
const sendUserRestPasswordEmail = async (req,res) => {
    const { email } = req.body;
    try{
       const userData = await User.findOne({email:email})
       if(userData != null){
        const secret = userData._id + process.env.JWT_SECRET_KEY
        const token = jwt.sign({userID : userData._id},secret,{
            expiresIn : '20m'
        })
        const link = `http://127.0.0.1:3000/api/user/reset/${userData._id}/${token}`
        let info = await transporter.sendMail({
            from : "rajnare90@gmail.com", 
            to : "rajnare90@gmail.com",
            subject : "For Reset Your Password",
            text : `<a href=${link}>Click on this for reset password`
        })
       return res.status(201).json({
         status : "success",
         message : "email send succussfully",
         token : token,
         userid : userData._id
       })
       }else{
          res.send({ status : "failed", massage : "email user is not found" }) 
       }
    }catch(err){
        res.json({
            status : 200,
            message : err.massage
        })
    }
}

//User Reset Password API
const  userPasswordRest = async (req,res) => {
    const {id,token} = req.params;
    const {newPassword,confirmPassword} = req.body;
    console.log("id.... token...", id ,token);
    try{
        const checkUser = await User.findById(id) 
         if(checkUser !=  null){
            const secretKey = checkUser._id + process.env.JWT_SECRET_KEY
            jwt.verify(token,secretKey)
            if(newPassword === confirmPassword){
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(confirmPassword, salt);
            await User.findByIdAndUpdate(checkUser._id, {$set: {password : password}})
            res.send({ status : "Success", massage : "Password update Successfully"})
            }else{
                res.send({ status : "failed", massage : "Password and confirmPassword is not match" })
            }
         }else{
            res.send({ status : "failed", massage : "email user is not found" })
         }
    }catch(err){
        res.json({
            status : 200,
            massage : err.message
        })
    }
}

module.exports = { userSignup, userLogin, 
    sendUserRestPasswordEmail ,userPasswordRest 
}
