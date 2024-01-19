const User = require('../models/User')
const Company = require('../models/Company')
const Influencer = require('../models/Influencer')

// fetch data for user details page when wanting to edit profile
exports.getUserProfile = (req, res, next) => {
    User.findById(req.params.userId).select("-password")
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            console.log('User Role:', user.role);
            let userData = { ...user.toObject() };

            // Determine the role-specific model based on the user's role
            let RoleModel = user.role === 'Influencer' ? Influencer : Company;

            // Find the role-specific profile using the roleProfile ID
            RoleModel.findById(user.roleProfile)
                .then((roleProfile) => {
                    if (!roleProfile) {
                        return res.status(404).json({ message: 'Role profile not found' });
                    }
                    // Add the role-specific data to the userData object
                    userData.roleData = roleProfile;
                    res.status(200).json(userData);
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ message: 'Internal Server Error' });
                });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
};

exports.updateUserProfile = (req, res, next) => {
    const userId = req.params.userId;
    const updatedUserData = req.body.user;
    const updatedRoleData = req.body.roleData;

    // Update User model
    User.findByIdAndUpdate(userId, updatedUserData, { new: true })
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Determine the role-specific model
            let RoleModel = updatedUser.role === 'Influencer' ? Influencer : Company;

            // Update the role-specific data
            return RoleModel.findByIdAndUpdate(updatedUser.roleProfile, updatedRoleData, { new: true })
                .then(updatedRoleProfile => {
                    if (!updatedRoleProfile) {
                        throw new Error('Role-specific profile not found');
                    }
                    return res.status(200).json({
                        message: 'Profile updated successfully',
                        user: updatedUser,
                        roleProfile: updatedRoleProfile
                    });
                });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
};
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