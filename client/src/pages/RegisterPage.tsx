import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/Logo';
import AuthBackgroundShape from '@/assets/svg/auth-background-shape';
import RegisterForm from '@/components/RegisterForm';
import GoogleSignInButton from '@/components/GoogleSignInButton';

interface RegisterPageProps {
    setIsAuthenticated: (auth: boolean) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setIsAuthenticated }) => {
    return (
        <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
            <div className='absolute'>
                <AuthBackgroundShape />
            </div>

            <Card className='z-1 w-full border-none shadow-md sm:max-w-lg'>
                <CardHeader className='gap-6'>
                    <Logo className='gap-3' />

                    <div>
                        <CardTitle className='mb-1.5 text-2xl'>Sign Up to DSA Practice</CardTitle>
                        <CardDescription className='text-base'>Ship Faster and Focus on Growth.</CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Register Form */}
                    <div className='space-y-4'>
                        <RegisterForm setIsAuthenticated={setIsAuthenticated} />

                        <p className='text-muted-foreground text-center'>
                            Already have an account?{' '}
                            <Link to="/login" className='text-card-foreground hover:underline'>
                                Sign in instead
                            </Link>
                        </p>

                        <div className='flex items-center gap-4'>
                            <Separator className='flex-1' />
                            <p className='text-sm text-muted-foreground'>or</p>
                            <Separator className='flex-1' />
                        </div>

                        <GoogleSignInButton />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterPage;
