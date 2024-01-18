// Extra layer of security by userRole
const authorizedRoles = (allowedRoles) => async(req, res, next) => {
    try {
        const userRole = req.user.role;

        if (allowedRoles.includes(userRole)) {
            next();
        } else {
            res.status(403).json({message: 'Permission Denied'})
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error'})
    }
}

module.exports = authorizedRoles;