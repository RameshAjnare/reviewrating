const ReviewCurdSchema = require("../model/review_schema");


const addReview = async (req, res) => {
  const curdReview = new ReviewCurdSchema(req.body);
  try {
    if (addReview != null) {
      console.log(curdReview);
      await curdReview.save();
      res.status(201).json({
        status : "Success",
        message : "Review Add successfully...",
      });
    }
  } catch (err) {
    res.status(500).json({
      status : "Failed",
      message : err.message,
    });
  }
};

const getReview = async (req, res) => {
  const companyId = req.params.id;
  try {
    const reviewData = await ReviewCurdSchema.find({ company_id: companyId });
    res.status(200).json({
      status : "Success",
      message : reviewData,
    });
  } catch (err) {
    res.status(500).json({
      status : "Failed",
      message : err.message,
    });
  }
};

const updateReviewCurd = async (req, res) => {
  const id = req.params.id;
  try {
     await ReviewCurdSchema.findByIdAndUpdate(id,req.body,{ new: true });
    res.status(200).json({
      status : "success",
      massage : "Review update successfully",
    });
  } catch (err) {
    res.status(500).json({
      status : "Failed",
      massage : err.massage,
    })
  }
}

const deleteReviewCurd = async (req, res) => {
  const id = req.params.id;
  try {
    await ReviewCurdSchema.findByIdAndDelete(id);
    res.status(200).json({
      status : "Success ",
      massage : "Review Delete Successfully",
    });
  } catch (err) {
    res.status(500).json({
      status : "Failed",
      massage : err.massage,
    });
  }
};

module.exports = { addReview, updateReviewCurd, getReview, deleteReviewCurd };
