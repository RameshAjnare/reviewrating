const { default: mongoose, model } = require("mongoose");

const reviewSchema= new mongoose.Schema({
    subject:{
        type:String,
        require:true
      },     
      review:{
        type:String,
        require:true
      },
      rating:{
        type:String,
        require:true
      },
      isActive:{
    
        type: Boolean,
        default:true
      },
company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
},
user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
}
})

userSchema.set('timestamps',true)
module.exports=model('review',reviewSchema);