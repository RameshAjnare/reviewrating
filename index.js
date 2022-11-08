const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const User = require('./model/user_schema')
require('./model/config');
const bcrypt = require('bcrypt')
const router = require('./routes/userRoutes')


app.use(express.json())
app.use(bodyParser.json())
app.use('/', router)



app.listen(9000, function (req, res) {

    console.log("server run on port 9000")


})