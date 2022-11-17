const express= require('express');
const router = express.Router()
const {upload} = require('../middlewares/imageStorage')
const user= require('../controller/userController')
const validate = require('../validation/user/user_validation')
const auth  = require('../middlewares/auth_middleware')

router.post('/registerUser',upload.single("profilepic"), user.userSignup)
router.post('/userLogin', validate.userLoginValidation , user.userLogin)
router.post('/send-rest-password-email',user.sendUserRestPasswordEmail)
router.post('/rest-password/:id/:token',auth.checkUserAuth,user.userPasswordRest)

module.exports = router; 