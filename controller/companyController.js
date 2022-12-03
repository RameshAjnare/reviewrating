 const Company = require('../model/company_schema')
const ReviewAndRating =require('../model/review_schema')


const createCompany = async (req,res) =>{

    const {companyName} = req.body;
    console.log(companyName);
   try{
   const companySchema = new Company(req.body)
 console.log('=====>',companySchema);
if(companySchema)
      {
         const companyExists = await Company.findOne({ companyName: companyName })
        if (companyExists) {
            return res.status(400).json({
                status : 400,
                error : "This Company Name already exists"
            });
        }
         const filePath =`/uploads/${req.file.filename}`;
         companySchema.company_logo = filePath
         const resultCompany = await companySchema.save();
          res.send({ status : "Success", massage : "Company data save successfully"})
      }else{
         res.send({ status : "failed", massage : "Company data is Null" })
      } 
   }catch(error){
      console.log(error)
      res.send({ status : "failed",message : error.message})
   }
}

const reviewAndRating = async (req,res) => {
console.log('=====>',req.body)
   try{
   const reviewData = new ReviewAndRating(req.body)
   const reviewResult= reviewData.save();
    return res.status(200).json({
      status : "success",
      message : "Review Data insert Successfully",
   }) 
   }catch(err){
      res.send({ status : "failed", massage:err})
   }
}


const companyList = async (req, res) => {
   console.log('=====>')
      try{
      const companyList =await Company.find({}); 
       const  totalCompany =await Company.find().count();
       for (const key in companyList) {
   
         console.log(`${key}: ${companyList[key].companyName}`);
     }
       return res.status(200).json({
         status : "success",
         count : totalCompany,
         message : companyList
      }) 
      }catch(err){
         res.send({ status : "failed",massage : err})
      }
   }

  const comapnyReviewComment = async (req,res) =>{
   let id = req.params.id;
   console.log("companyId====>",id);
   try{
      const companyDetails = await Company.findById(id).lean(); 
      console.log("companyDetails=>",companyDetails)
      const comment = await ReviewAndRating.find({'company_id' : `${id}`})
      .populate({
        path : 'user_id', select : 'name profilepic'
      }).populate({
         path : 'company_id', select : '_id'
      })
      console.log("====>",comment);
       for (const key in companyDetails) {
         console.log(`${key}: ${companyDetails.companyName}`);
     }
  const commenstAndCompanyName= {
    'companyName' : companyDetails,
    'comment' : comment
  }
       return res.status(200).json({
         status : "success",
         message : commenstAndCompanyName,

      })
   }catch(error){
      res.send({ status : "failed",Error:error.message}) 
   }
  } 
   

module.exports = {createCompany,companyList,reviewAndRating,comapnyReviewComment}