const joi = require('@hapi/joi')
joi.objectId = require('joi-objectid')(joi)


const reviewCurdSchama = {
  
reviewRating : joi.object({
  subject : joi.string().min(2).max(20).required(),
  review : joi.string().min(2).max(100).required(),
  rating : joi.number().integer().min(1).max(5),
  userId : joi.objectId().required(),
  companyId : joi.objectId().required()
})
}

module.exports = reviewCurdSchama
