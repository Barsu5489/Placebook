import { useForm } from '@inertiajs/react'
import Input from '../components/shared/Input'

const Login = () => {
  const { data, setData, post, processing, errors } = useForm({
    email_address: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign in</h1>
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email_address"
            value={data.email_address}
            onChange={e => setData('email_address', e.target.value)}
            error={errors.email_address}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={data.password}
            onChange={e => setData('password', e.target.value)}
            error={errors.password}
            required
          />

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            {processing ? 'Signing in...' : 'Sign in'}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:text-blue-700">
              Create one
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login