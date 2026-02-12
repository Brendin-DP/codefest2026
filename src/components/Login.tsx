import { useState, FormEvent } from 'react'
import { useAuth } from '../AuthContext'
import { hasAuthConfigured } from '../auth'
import './Login.css'

interface LoginProps {
  onSuccess?: () => void
}

export function Login({ onSuccess }: LoginProps) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!hasAuthConfigured()) {
      setError('Login is not configured. Set VITE_AUTH_EMAIL and VITE_AUTH_PASSWORD.')
      return
    }

    if (login(email, password)) {
      setEmail('')
      setPassword('')
      onSuccess?.()
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="login-form-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Admin login</h3>
        <p className="login-hint">Sign in to manage team allocations</p>
        <label>
          <span className="login-label">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label>
          <span className="login-label">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p className="login-error">{error}</p>}
        <button type="submit">Sign in</button>
      </form>
    </div>
  )
}
