var express = require('express');
var router = express.Router();
const companyController = require('../controllers/companyController')

// router.get('/:companyId', companyController.getCompany)
// save an influencer into company database
router.post('/:companyId/saveInfluencer/:influencerId', companyController.saveInfluencer);
router.get('/:companyId/savedInfluencers', companyController.savedInfluencers);
router.delete('/:companyId/delete/:influencerId', companyController.deleteInfluencer);
module.exports = router;
