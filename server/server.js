require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS configuration with support for multiple origins
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://dsa-practice-sheet.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Normalize origin by removing trailing slash
        const normalizedOrigin = origin.replace(/\/$/, '');

        // Check if the normalized origin is in the allowed list
        const isAllowed = allowedOrigins.some(allowed =>
            allowed.replace(/\/$/, '') === normalizedOrigin
        );

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization']
}));

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true in production with HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dsa-sheet')
    .then(async () => {
        console.log('MongoDB Connected');

        // Auto-seed database in development mode (if AUTO_SEED is not set to 'false')
        if (process.env.NODE_ENV !== 'production' && process.env.AUTO_SEED !== 'false') {
            try {
                const seedDB = require('./seed');
                await seedDB(false); // false = don't close connection
                console.log('✓ Auto-seeding completed');
            } catch (error) {
                console.error('Auto-seeding failed, continuing anyway:', error.message);
            }
        }
    })
    .catch(err => console.error('MongoDB Connection Error:', err));

const authRoutes = require('./routes/authRoutes');
const problemRoutes = require('./routes/problemRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);

app.get('/', (req, res) => {
    res.send('DSA Sheet API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});