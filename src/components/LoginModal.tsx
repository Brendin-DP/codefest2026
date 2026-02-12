import { useState, FormEvent, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Login.css'

interface LoginModalProps {
  onClose: () => void
  onSuccess: () => void
  login: (email: string, password: string) => boolean
}

export function LoginModal({ onClose, onSuccess, login }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (login(email, password)) {
      onSuccess()
    } else {
      setError('Invalid email or password')
    }
  }

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Login"
      className="login-overlay"
      onClick={onClose}
    >
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <div className="login-form-wrapper">
          <form className="login-form" onSubmit={handleSubmit}>
            <h3>Admin login</h3>
            <p className="login-hint">Admin access.</p>
            {error && <p className="login-error">{error}</p>}
            <div>
              <label className="login-label" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="login-label" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="submit">Login</button>
              <button type="button" onClick={onClose} style={{ background: 'var(--bg)', color: 'var(--text)' }}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
