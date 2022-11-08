const mongoose= require('mongoose')

const companySchema = new mongoose.Schema({
  companyName:{

    type:String,
    require:true
  },
  location:{
    type:String,
    require: true,
    default: false
  },
  
  city:{
    type:String,
    require:true
  },
  founded:{
    type:String,
    require:true
  },
  profilepic : String,

  isActive:{

    type: Boolean,
    default:true
  },

  userId: {
  
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref: 'user'

  }

})
companySchema.set('timestamps',true)

module.exports = mongoose.model('company', companySchema)