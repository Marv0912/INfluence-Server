const { model, Schema } = require("mongoose");

const userSchema = new Schema(
    {
        name:  { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        roleProfile: {
            type: Schema.Types.ObjectId,
            refPath: 'role', 
        },
        role: {
            type: String,
            enum: ['Company', 'Influencer'],
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

