var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middleware/isAuthenticated')
const influencerController = require('../controllers/influencerController');

router.get('/:influencerId', isAuthenticated, influencerController.getInfluencerProfile)
router.post('/search', isAuthenticated, influencerController.searchInfluencers)
router.post('/:influencerId/save', isAuthenticated, influencerController.saveInfluencer)


module.exports = router;
