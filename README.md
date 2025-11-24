# DSA Practice Sheet - Complete MERN Application

A full-stack web application for tracking Data Structures and Algorithms (DSA) problem-solving progress with persistent user data across sessions.

## ✨ Features

### 🔐 Authentication
- User registration and login with JWT
- Google OAuth integration
- Secure password hashing with bcrypt
- Protected routes with JWT middleware

### 📚 DSA Sheet Organization
- **Hierarchical Structure**: Chapter → Topics → Problems
- Each problem includes:
  - Title
  - Difficulty level (Easy/Medium/Hard)
  - YouTube tutorial link
  - LeetCode/Codeforces practice link
  - Article/theory link
  - Completion checkbox

### 📊 Progress Tracking
- ✅ Real-time progress updates
- 💾 Persistent storage in MongoDB
- 🔄 Progress restored on login
- 📈 Progress displayed at multiple levels:
  - Overall progress percentage
  - Progress per chapter (with visual progress bar)
  - Progress per topic

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd DSA-Practice-Sheet
```

2. **Install Backend Dependencies**
```bash
cd server
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../client
npm install
```

4. **Configure Environment Variables**

Create `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/dsa-sheet
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

This will create 10 sample problems across 2 chapters:
- **Arrays & Hashing** (6 problems)
- **Two Pointers** (4 problems)

6. **Start the Backend Server**
```bash
cd server
npm run dev
```

7. **Start the Frontend (in a new terminal)**
```bash
cd client
npm run dev
```

8. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📖 Usage Guide

### 1. Register/Login
- Navigate to `/register` to create an account
- Or use `/login` to sign in
- Google OAuth is also available

### 2. View DSA Sheet
- After login, you'll see the Dashboard with all chapters
- Each chapter shows:
  - Total problems
  - Completed count
  - Progress percentage
  - Visual progress bar

### 3. Track Progress
- Click the checkbox next to any problem to mark it as completed
- Progress is saved immediately to MongoDB
- Checkboxes persist across logins

### 4. Access Resources
- Click the YouTube icon to watch tutorials
- Click the LeetCode icon to practice on LeetCode
- Click the article icon to read theory/articles

## 🗄️ Database Schema

### User Model
- `username` (optional)
- `email` (optional)
- `password` (hashed, optional if using OAuth)
- `googleId` (optional)
- `completedProblems` (array of Problem ObjectIds)

### Problem Model
- `title` (required)
- `chapter` (required)
- `topic` (required)
- `difficulty` (Easy/Medium/Hard)
- `links` (youtube, leetcode, article)

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback

### Problems
- `GET /api/problems` - Get all problems (grouped)
- `GET /api/problems/progress` - Get user progress (requires auth)
- `POST /api/problems/toggle` - Toggle problem completion (requires auth)

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Passport.js** for OAuth
- **bcryptjs** for password hashing

## 📝 Key Features Implementation

### Progress Persistence
1. User checks a problem → Frontend sends `problemId` to backend
2. Backend adds/removes from `User.completedProblems` array
3. MongoDB saves the update
4. On next login, frontend fetches `completedProblems` and marks checkboxes

### Chapter Organization
- Problems are grouped by chapter and topic
- Each chapter displays its own progress
- Topics are nested within chapters

## 🚀 Deployment

See `AWS_DEPLOYMENT.md` for detailed AWS EC2 deployment instructions.

### Quick Deployment Steps
1. Set up MongoDB Atlas
2. Configure environment variables
3. Deploy backend to EC2
4. Deploy frontend (build and serve)
5. Configure domain and SSL

## 📚 Documentation

- `PROJECT_STRUCTURE.md` - Detailed project structure
- `IMPLEMENTATION_GUIDE.md` - Implementation details and flow
- `AWS_DEPLOYMENT.md` - AWS deployment guide

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (local) or Atlas connection string is correct
- Check `MONGO_URI` in `.env`

### Authentication Issues
- Verify `JWT_SECRET` is set in `.env`
- Check token is being sent in `x-auth-token` header

### Progress Not Persisting
- Check MongoDB connection
- Verify user is authenticated (token valid)
- Check browser console for errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request


**Built with ❤️ using the MERN stack**

