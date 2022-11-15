const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express();
require('./model/config');
const bcrypt = require('bcrypt')
const cron = require('node-cron')
const bodyParser = require('body-parser')
const router = require('./routes/commonRoutes')

app.use(express.json())
app.use(bodyParser.json())
app.use('/',router)

app.listen(process.env.port, function (req, res) {

    console.log("server run on port 9000")


})