var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middleware/isAuthenticated')
var userControlData = require('../controllers/userController')
const { getUserProfile, updateUserProfile, deleteUserProfile } = userControlData

router.get('/:userId', isAuthenticated, getUserProfile)
router.post('/:userId', isAuthenticated, updateUserProfile)
router.delete('/:userId', isAuthenticated, deleteUserProfile)


module.exports = router;
