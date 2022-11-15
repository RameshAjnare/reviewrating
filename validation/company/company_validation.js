const company = require('./company_shema')

module.exports = {
    companyValidation : async (req,res,next) =>{
        const value = await company.companyRegister.validate(req.body, {abortEarly : false})
        if(value.error){
            res.json({
                success : 0,
                message : value.error.details[0].message
            })
        }else{
            next()
        }
    }
}

