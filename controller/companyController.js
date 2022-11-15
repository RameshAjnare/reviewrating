const Company = require('../model/company_schema')

const createCompany = async (req,res) =>{

    const companyData = req.body;
    console.log(companyData);
   try{
   const companySchema = new Company(req.body)
 console.log('=====>',companySchema);
if(companySchema)
      {
         const filePath =`/uploads/${req.file.filename}`;
         companySchema.company_logo = filePath
         const resultCompany = await companySchema.save();
          res.send({ status: "Success", massage: "Company data save successfully"})
      }else{
         res.send({ status: "failed", massage: "Company data is Null" })
      } 
   }catch(error){
      console.log(error)
      res.send({ status: "failed",error })
   }
}

const companyList = async (req,res) => {
console.log('=====>')
   try{
   const companyList =await Company.find({}); 
    const  totalCompany =await Company.find().count();
    for (const key in companyList) {

      console.log(`${key}: ${companyList[key].companyName}`);
  }
    return res.status(200).json({
      status:"success",
      count: totalCompany,
      message: companyList
   }) 
   }catch(err){
      res.send({ status: "failed",massage:err})
   }
}

module.exports = {createCompany,companyList}