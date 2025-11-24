import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface LoginFormProps {
  setIsAuthenticated: (auth: boolean) => void;
}

const LoginForm = ({ setIsAuthenticated }: LoginFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData)
      localStorage.setItem('token', res.data.token)
      setIsAuthenticated(true)
      navigate('/profile')
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Login Failed')
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

      <Button className='w-full bg-black text-white hover:bg-gray-900' type='submit'>
        Sign In
      </Button>
    </form>
  )
}

export default LoginForm

