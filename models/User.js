const { model, Schema } = require("mongoose");

const userSchema = new Schema(
    {
        name:  { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ['company', 'influencer'],
            required: true
        },
        photo: {
            type: String,
            default: 'https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg'
        }
    },
    {
        timestamps: true,
    }
);

module.exports = model("User", userSchema);

