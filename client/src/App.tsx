import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Progress from './pages/Progress';
import AuthCallback from './pages/AuthCallback';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Verify token is valid by making a request
                    await axios.get('http://localhost:5000/api/problems/progress', {
                        headers: { 'x-auth-token': token }
                    });
                    setIsAuthenticated(true);
                } catch (error: any) {
                    // Token is invalid, remove it
                    if (error.response?.status === 401) {
                        localStorage.removeItem('token');
                        setIsAuthenticated(false);
                    }
                }
            }
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <Router>
            <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
                <Routes>
                    <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />} />
                    <Route 
                        path="/auth/callback" 
                        element={<AuthCallback setIsAuthenticated={setIsAuthenticated} />} 
                    />
                    <Route
                        path="/profile"
                        element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/dashboard"
                        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/progress"
                        element={isAuthenticated ? <Progress /> : <Navigate to="/login" />}
                    />
                    <Route path="/" element={<Navigate to="/profile" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
