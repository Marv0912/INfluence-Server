var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middleware/isAuthenticated')
var userController = require('../controllers/userController')


router.get('/:userId', isAuthenticated, userController.getUserProfile)
router.post('/update/:userId', isAuthenticated, userController.updateUserProfile)
router.delete('/:userId', isAuthenticated, userController.deleteUserProfile)


module.exports = router;
