const express = require('express');
const userRouter = require('./userRoutes')
const companyRouter = require('./compnayRouter')
const router = express.Router();

router.use('/user',userRouter)
router.use('/company',companyRouter)

module.exports = router;
