const joi= require('@hapi/joi')

const ComapanyValschema = {
    companyRegister: joi.object({
       companyName: joi.string().max(50).required(),
       location: joi.string().required(),
       city: joi.string().required(),
       founded: joi.string().required(),
       userId: joi.object().required()
    }).unknown(true)
}

module.exports = ComapanyValschema