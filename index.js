const express = require('express')
const app = express();
require('./model/config');
const bcrypt = require('bcrypt')
const cron = require('node-cron')
const bodyParser = require('body-parser')
const router = require('./routes/userRoutes')
const userForEmail= require('./controller/userController')



app.use(express.json())
app.use(bodyParser.json())
app.use('/', router)

const sendEmail1 = (req,res) => {
    console.log('running before task every second')
    userForEmail.sendMail;
    console.log('running a task every 10 second')
}  

cron.schedule("*/10  * * * * *",function(){
    sendEmail1();
})


app.listen(9000, function (req, res) {

    console.log("server run on port 9000")


})