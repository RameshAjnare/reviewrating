const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
     service: "Gmail",
     auth: {
        user : "rajnare90@gmail.com",
        pass : "kcnddgusyrwtemoy"
     }

});

const mailOptions= {
    from:"rajnare90@gmail.com",
    //to:"arun.lal@graffersid.com",
    to:"narendracharan25753@gmail.com",
    subject:"Hey this is test mail",
    text:"hye this is body part"
}

module.exports={
    transporter,
    mailOptions
}