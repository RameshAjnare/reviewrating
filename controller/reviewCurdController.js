const ReviewCurdSchema = require('../model/review_schema');

const addReview = async (req,res) => {
    const curdReview = new ReviewCurdSchema(req.body)
    try{
        if(addReview != null){
        console.log(curdReview)
        await curdReview.save();
        res.status(201).json({
            status: "Success",
            message: "Review Add successfully..."
       })
        }
    }catch(err){
      res.status(500).json({
           status: "failed",
           message: err
      })
    }   
}

const getReview = async (req,res) =>{
           const companyId = req.params.id 
     try{
          const reviewData = await ReviewCurdSchema.find({company_id : companyId})
          res.json({
            status : 200,
            message : reviewData
       })
     }catch(err){
        res.status(500).json({
            status : "failed",
            message : err.message
       })
     }
}

const updateReviewCurd = async (req,res) =>{

  const id = req.params.id
  try{
       const updateReview = await ReviewCurdSchema.findByIdAndUpdate(id,req.body,{new : true});
       res.status(200).json({
          status:"success",
          massage:"Review update successfully"
       })
    }catch(err){
     res.status(500).json({
          status:"Faild",
          massage:err.massage   
     })
  }
  
}

const deleteReviewCurd = async (req,res) =>{

     const id = req.params.id
     try{
          const updateReview = await ReviewCurdSchema.findByIdAndDelete(id);
          res.status(200).json({
             status:"success ",
             massage:"Review Data successfully Delete"
          })
       }catch(err){
        res.status(500).json({
             status:"Faild",
             massage:err.massage   
        })
     }
     
   }
   

module.exports = {addReview,updateReviewCurd,getReview,deleteReviewCurd}
