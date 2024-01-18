var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middleware/isAuthenticated')
var userController = require('../controllers/userController')
const { getUserProfile, updateUserProfile, deleteUserProfile } = userController

router.get('/:userId', isAuthenticated, getUserProfile)
router.post('/:userId', isAuthenticated, updateUserProfile)
router.delete('/:userId', isAuthenticated, deleteUserProfile)


module.exports = router;
