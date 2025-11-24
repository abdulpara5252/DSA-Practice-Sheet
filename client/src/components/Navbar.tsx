import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };


    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-gray-900">
                            DSA Sheet
                        </span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link
                            to="/profile"
                            className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/dashboard"
                            className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/progress"
                            className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                        >
                            Progress
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

