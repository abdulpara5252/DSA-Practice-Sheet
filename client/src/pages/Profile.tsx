import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { API_URL } from '@/lib/config';

interface User {
    username?: string;
    email?: string;
    name?: string;
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<User>({});
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`${API_URL}api/auth/user`, {
                    headers: { 'x-auth-token': token }
                });

                setUser(response.data);
                setLoading(false);
            } catch (err: any) {
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    const displayName = user.name || user.username || 'User';
    const displayEmail = user.email || 'No email provided';

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome, {displayName}
                    </h1>
                    <p className="text-gray-600 mb-8">Email: {displayEmail}</p>
                    
                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Username</label>
                                <p className="text-gray-900 mt-1">{user.username || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Email</label>
                                <p className="text-gray-900 mt-1">{displayEmail}</p>
                            </div>
                            {user.name && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                                    <p className="text-gray-900 mt-1">{user.name}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;

