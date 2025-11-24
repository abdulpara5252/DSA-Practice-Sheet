import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface RegisterFormProps {
  setIsAuthenticated: (auth: boolean) => void;
}

const RegisterForm = ({ setIsAuthenticated }: RegisterFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.username,
        password: formData.password
      })
      localStorage.setItem('token', res.data.token)
      setIsAuthenticated(true)
      navigate('/profile')
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Registration Failed')
    }
  }

  return (
    <form className='space-y-4' onSubmit={onSubmit}>
      {error && (
        <div className='p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded'>
          <p className='font-medium'>Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* Username */}
      <div className='space-y-1'>
        <Label className='leading-5' htmlFor='username'>
          Username*
        </Label>
        <Input 
          type='text' 
          id='username' 
          name='username'
          value={formData.username}
          onChange={onChange}
          placeholder='Enter your username' 
          required
        />
      </div>

      {/* Email */}
      <div className='space-y-1'>
        <Label className='leading-5' htmlFor='userEmail'>
          Email address*
        </Label>
        <Input 
          type='email' 
          id='userEmail' 
          name='email'
          value={formData.email}
          onChange={onChange}
          placeholder='Enter your email address' 
          required
        />
      </div>

      {/* Password */}
      <div className='w-full space-y-1'>
        <Label className='leading-5' htmlFor='password'>
          Password*
        </Label>
        <div className='relative'>
          <Input
            id='password'
            name='password'
            type={isPasswordVisible ? 'text' : 'password'}
            value={formData.password}
            onChange={onChange}
            placeholder='••••••••••••••••'
            className='pr-9'
            required
          />
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={() => setIsPasswordVisible(prevState => !prevState)}
            className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
          >
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className='sr-only'>{isPasswordVisible ? 'Hide password' : 'Show password'}</span>
          </Button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className='w-full space-y-1'>
        <Label className='leading-5' htmlFor='confirmPassword'>
          Confirm Password*
        </Label>
        <div className='relative'>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={onChange}
            placeholder='••••••••••••••••'
            className='pr-9'
            required
          />
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={() => setIsConfirmPasswordVisible(prevState => !prevState)}
            className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
          >
            {isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className='sr-only'>{isConfirmPasswordVisible ? 'Hide password' : 'Show password'}</span>
          </Button>
        </div>
      </div>

      {/* Privacy policy */}
      <div className='flex items-center gap-3'>
        <Checkbox id='rememberMe' className='size-6' required />
        <Label htmlFor='rememberMe' className='text-sm'>
          <span className='text-muted-foreground'>I agree to</span> <a href='#' className='text-primary hover:underline'>privacy policy & terms</a>
        </Label>
      </div>

      <Button className='w-full bg-black text-white hover:bg-gray-900' type='submit'>
        Sign Up to DSA Practice
      </Button>
    </form>
  )
}

export default RegisterForm

