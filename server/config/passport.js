const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "https://dsa-practice-sheet-api.vercel.app/api/auth/google/callback" || "http://localhost:5000/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user exists with this Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
            return done(null, user);
        }

        // Check if user exists with this email
        if (profile.emails && profile.emails[0]) {
            user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
                // Link Google account to existing user
                user.googleId = profile.id;
                user.picture = profile.photos && profile.photos[0] ? profile.photos[0].value : undefined;
                await user.save();
                return done(null, user);
            }
        }
        
        user = new User({
            googleId: profile.id,
            email: profile.emails && profile.emails[0] ? profile.emails[0].value : undefined,
            name: profile.displayName,
            username: profile.emails && profile.emails[0] ? profile.emails[0].value.split('@')[0] : `user_${profile.id.substring(0, 8)}`,
            picture: profile.photos && profile.photos[0] ? profile.photos[0].value : undefined
        });

        await user.save();
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;

