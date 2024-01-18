const User = require('../models/User')
const Company = require('../models/Company')
const Influencer = require('../models/Influencer')

// fetch data for user details page when wanting to edit profile
exports.getUserProfile = (req, res, next) => {
    User.findById(req.params.userId).select("-password")
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }
            console.log('User Role:', user.role);
            let userData = { ...user.toObject() };

            if (user.role === 'influencer') {
                Influencer.findOne({ user: req.params.userId })
                    .then((influencer) => {
                        userData.influencer = influencer;
                        console.log('Company Data:', influencer);
                        res.status(200).json(userData);
                    })
                    .catch((error) => {
                        console.error(error)
                        res.status(500).json({ message: 'Internal Server Error' })
                    })
            } else if (user.role === 'company') {
                Company.findOne({ user: req.params.userId })
                    .then((company) => {
                        userData.company = company
                        console.log('Company Data:', company);
                        res.status(200).json(userData)
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).json({ message: 'Internal Server Error' })
                    })
            }
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
                return res.status(404).json({ message: 'User not found' })
            }
            res.status(200).json({ message: 'User profile updated successfully', user: updatedUser })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' })
        })
}
exports.deleteUserProfile = (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
        .then((deletedUser) => {
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (deletedUser.role === 'influencer') {
                return Influencer.findOneAndRemove({ user: req.params.userId });
            } else if (deletedUser.role === 'company') {
                return Company.findOneAndRemove({ user: req.params.userId });
            }
        })
        .then(() => {
            res.status(200).json({ message: 'User deleted successfully' });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Internal Server Error' });
        });
};