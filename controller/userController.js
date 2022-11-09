const { error } = require("@hapi/joi/lib/base");
const bcrypt = require("bcrypt");
const User = require("../model/user_schema");
const userSchema = require("../model/user_schema")
const {transporter,mailOptions}=require('../service/serviceMail')

const userSignup = async function(req,res){


    const {email,password} = req.body;
  
      const userData= new User({
          name: req.body.name,
          email: req.body.email,
          password:req.body.password,
          mobile:req.body.mobile,
          city:req.body.city,
          state:req.body.state
      })
  
  
  console.log("====>",userData);
  
      try {  
  
          console.log('inside try');
  
          const userExists = await User.findOne({email:req.body.email})
          
          if(userExists){
  
              return res.status(400).json({
                  status: 400,
                  error:"Email already exit"
              });
          }
  
          const salt =  await bcrypt.genSalt(10);
         userData.password = await bcrypt.hash(password,salt);
  
  
          const addRes = await userData.save()
          console.log('after try',);
  
  
      } catch (err) {
  
          res.send('Error')
  
          console.log(err)
  
      }
   }

   const sendMail = async(req,res)=>{
           transporter.sendMail(mailOptions,(error,info)=>{

          if(error){
                 console.log(error)
          
                  }else{
              console.log("Email Sent Successfully"+info.response);
    }
})
 
   }
  
   module.exports = { userSignup , sendMail }