import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface AuthCallbackProps {
    setIsAuthenticated: (auth: boolean) => void;
}

const AuthCallback: React.FC<AuthCallbackProps> = ({ setIsAuthenticated }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    useEffect(() => {
        if (error) {
            navigate('/login?error=' + error);
            return;
        }

        if (token) {
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
            navigate('/profile');
        } else {
            navigate('/login?error=no_token');
        }
    }, [token, error, navigate, setIsAuthenticated]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <p className="text-lg">Completing sign in...</p>
            </div>
        </div>
    );
};

export default AuthCallback;

