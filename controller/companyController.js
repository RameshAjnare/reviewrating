const Company = require("../model/company_schema");
const ReviewAndRating = require("../model/review_schema");


const createCompany = async (req, res) => {
  const { companyName } = req.body;
  try {
    const companySchema = new Company(req.body);
    if (companySchema) {
      const companyExists = await Company.findOne({ companyName : companyName });
      if (companyExists) {
        return res.status(400).json({
          status : "Failed",
          error : "Company name already exists",
        });
      }
      const filePath = `/uploads/${req.file.filename}`;
      companySchema.company_logo = filePath;
      await companySchema.save();
      res.status(201).json({
        status: "Success",
        massage: "Company data save successfully",
      });
    } else {
      res.status(403).json({ status : "Failed", massage : "Company data is Empty " });
    }
  } catch (error) {
    res.status(500).json({ status : "Failed", message : error.message });
  }
};

const reviewAndRating = async (req, res) => {
  try {
    const reviewData = new ReviewAndRating(req.body);
    await reviewData.save();
    return res.status(200).json({
      status : "success",
      message : "Review Data insert Successfully",
    });
  } catch (err) {
    res.status(500).json({ status : "Failed", massage : err.message });
  }
};

const companyList = async (req, res) => {
  try {
    const companyList = await Company.find();
    const totalCompany = await Company.find().count();
    return res.status(200).json({
      status : "Success",
      count : totalCompany,
      message : companyList,
    });
  } catch (err) {
    res.status(500).json({ status : "Failed", massage : err.message });
  }
};

const comapnyReviewComment = async (req, res) => {
  let id = req.params.id;
  try {
    const companyDetails = await Company.findById(id).lean();
    const comment = await ReviewAndRating.find({ company_id : `${id}` })
      .populate({
        path : "user_id",
        select : "name profilepic",
      }).populate({
        path : "company_id",
        select : "_id",
      });
    const commenstAndCompanyName = {
      companyName : companyDetails,
      comment : comment,
    };
    return res.status(200).json({
      status : "Success",
      message : commenstAndCompanyName,
    });
  } catch (error) {
    res.status(500).json({ status : "Failed", Error : error.message });
  }
};

module.exports = {
  createCompany,
  companyList,
  reviewAndRating,
  comapnyReviewComment,
};
