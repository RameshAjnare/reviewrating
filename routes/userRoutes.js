const express= require('express');
const router = express.Router()
const user= require('../controller/userController')
const validate = require('../validation/user/user_validation')

router.post('/registerUser', validate.registerUserValidation, user.userSignup)

module.exports = router;