const express = require('express')
const {upload} = require('../middlewares/imageStorage')
const company = require('../controller/companyController')
const validate = require('../validation/company/company_validation')
const router = express.Router();

router.post('/create',validate.companyValidation,upload.single("company_logo"),company.createCompany)
router.get('/company_list',company.companyList);
router.post('/company_review',validate.reviewValidation,company.reviewAndRating);
router.post('/reviews/:id',company.comapnyReviewComment)
module.exports = router;  