const { model, Schema } = require("mongoose");

//TODO: Verify Model
const companyProfileSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        companyName: String,
        industry: String,
        location: String,
        contactInformation: {
            email: String,
            phone: String,
            address: String,
        },
        savedInfluencers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Influencer',
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = model("Company", companyProfileSchema);







