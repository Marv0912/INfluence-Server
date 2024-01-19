const User = require('../models/User');
const Company = require('../models/Company');
const Influencer = require('../models/Influencer')


exports.getCompanyData = (req, res, next) => {
    const { companyId } = req.params

    Company.findById(companyId)
        .populate('savedInfluencers')
        .then(company => {
            if (!company) {
                return res.status(404).json({ message: 'Company not found' });
            }
            res.status(200).json(company);
        })
        .catch(error => {
            console.error('Error fetching company data:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
};

exports.saveInfluencer = (req, res, next) => {
    const { companyId, influencerId } = req.params;

    Company.findById(companyId)
        .then(company => {
            if (!company) {
                return res.status(404).json({ message: 'Company not found' });
            }
            if (!company.savedInfluencers.includes(influencerId)) {
                company.savedInfluencers.push(influencerId);
            }
            return company.save();
        })
        .then(() => res.status(200).json({ message: 'Influencer saved successfully' }))
        .catch(error => res.status(500).json({ message: 'Internal Server Error', error }));
};

exports.savedInfluencers = (req, res, next) => {
    const { companyId } = req.params;

    Company.findById(companyId)
        .populate({
            path: 'savedInfluencers',
            populate: {
                path: 'user',
                select: '-password',
            },
        })
        .then((company) => {
            if (!company) {
                return res.status(404).json({ message: 'Company not found' });
            }
            const influencersWithUserData = company.savedInfluencers;
            res.status(200).json(influencersWithUserData);
        })
        .catch((error) => res.status(500).json({ message: 'Internal Server Error', error }));
};

exports.deleteInfluencer = (req, res, next) => {
    const { companyId, influencerId } = req.params;

    // Find the company by ID
    Company.findById(companyId)
        .then((company) => {
            if (!company) {
                return res.status(404).json({ message: 'Company not found' });
            }

            // Remove the influencer ID from the company's savedInfluencers array
            const indexToRemove = company.savedInfluencers.indexOf(influencerId);
            if (indexToRemove !== -1) {
                company.savedInfluencers.splice(indexToRemove, 1);
            }

            // Save the updated company data
            company.save()
                .then(() => {
                    res.status(200).json({ message: 'Influencer removed from savedInfluencers successfully' });
                })
                .catch((error) => {
                    res.status(500).json({ message: 'Failed to save company data', error });
                });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Internal Server Error', error });
        });
};
