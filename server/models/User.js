const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        sparse: true // Allows multiple null values but enforces uniqueness for non-null values
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        sparse: true
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId; // Password required only if not using Google OAuth
        }
    },
    googleId: {
        type: String,
        sparse: true,
        unique: true
    },
    name: {
        type: String,
        trim: true
    },
    picture: {
        type: String
    },
    completedProblems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    }]
}, { timestamps: true });

userSchema.pre('validate', async function() {
    if (!this.username && !this.googleId) {
        this.invalidate('username', 'Either username or googleId must be provided');
    }
});

module.exports = mongoose.model('User', userSchema);
