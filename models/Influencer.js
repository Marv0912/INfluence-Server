const { model, Schema} = require("mongoose");

const influencerProfileSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        bio: String,
        website: String,
        instagramUrl: String,
        instagramConnected: { type: Boolean, default: false },
        followersCount: Number,
        engagementRate: Number,
        category: String,
        location: String,
        savedByCompanies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Company',
            }
        ],
        manualEntry: { type: Boolean, default: false }
    }
)

module.exports = model("Influencer", influencerProfileSchema)