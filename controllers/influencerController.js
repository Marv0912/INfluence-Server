const Influencer = require('../models/Influencer')
const Company = require('../models/Company')

exports.getInfluencerProfile = (req, res, next) => {
    Influencer.findById(req.params.influencerId)
        .populate('user', 'name username photo')
        .then((influencer) => {
            if (!influencer) {
                return res.status(404).json({ message: 'Influencer not found' })
            }
            const { bio, website, followersCount, engagementRate, category, location, instagramUrl, user } = influencer

            const fetchedInfluencerInfo = {
                bio,
                user,
                website,
                followersCount,
                engagementRate,
                category,
                location,
                instagramUrl
            }
            res.status(200).json(fetchedInfluencerInfo);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Server Error' })
        })
}

exports.searchInfluencers = (req, res, next) => {
    // followerCount, location, category search query
    const { location, category, fromOption, toOption } = req.body
    const query = {}
    if (location) query.location = { $regex: location, $options: i }
    if (category) query.category = { $regex: category, $options: i }
    const optionsToNumeric = {
        "0": 0,
        "5000": 5000,
        "15000": 15000,
        "50000": 50000,
        "150000": 150000,
        "300000": 300000,
        "500000": 500000,
        "1000000": 1000000,
    };

    if (fromOption && toOption) {
        const fromValue = optionsToNumeric[fromOption];
        const toValue = optionsToNumeric[toOption];
        if (fromValue !== undefined && toValue !== undefined) {
            query.followersCount = {
                $gte: fromValue,
                $lte: toValue,
            };
        }
    }
    Influencer.find(query)
        .populate('user', 'name')
        .then((foundInfluencers) => {
            res.status(200).json(foundInfluencers)

        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Server Error' })
        })
}

exports.saveInfluencer = (req, res, next) => {
    // Ensure the requesting user is a company
    if (req.user.role !== 'company') {
        return res.status(403).json({ message: 'Permission denied' });
    }

    // Find the influencer by their influencerId
    Influencer.findById(req.params.influencerId)
        .then((influencer) => {
            if (!influencer) {
                return res.status(404).json({ message: 'Influencer not found' });
            }

            // Check if the company has already saved this influencer to prevent duplicates
            if (influencer.savedByCompanies.includes(req.user._id)) {
                return res.status(400).json({ message: 'Influencer already saved' });
            }

            // Add the company's reference to the influencer's document
            influencer.savedByCompanies.push(req.user._id);

            // .save is a mongoose method to save/update data collections
            return influencer.save();
        })
        .then(() => {
            res.status(200).json({ message: 'Influencer saved successfully' });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
};

// TODO: Create remove saved influencer from company database functionality 

