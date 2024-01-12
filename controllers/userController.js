const User = require('../models/User')

// fetch data for user details page when wanting to edit profile
exports.getUserProfile = (req, res, next) => {
    User.findById(req.params.userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }
            const { name, username, email, role, instagramUrl, photo } = user;

            const fetchedUserInfo = {
                name,
                username,
                email,
                role,
                instagramUrl,
                photo,
            }
            res.status(200).json(fetchedUserInfo)
        })

        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' })
        })
}

exports.updateUserProfile = (req, res, next) => {
    const updatedData = req.body;

    User.findByIdAndUpdate(req.params.userId, updatedData, { new: true })
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found'})
            }
            res.status(200).json({ message: 'User profile updated successfully', user: updatedUser})
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error'})
        })
}
exports.deleteUserProfile = (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
        .then((deletedUser) => {
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found'})
            }
            res.status(200).json({ message: 'Successfully deleted User account'})
        })
}