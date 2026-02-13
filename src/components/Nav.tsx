import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { LoginModal } from './LoginModal'
import { useState } from 'react'
import './Nav.css'

export function Nav() {
  const { isAuthenticated, login, logout } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li><Link to="/#program" className="nav-link">Program</Link></li>
        <li><Link to="/#teams" className="nav-link">Teams</Link></li>
        <li><Link to="/#products" className="nav-link">Products</Link></li>
        <li><Link to="/#scoring" className="nav-link">Scoring</Link></li>
        <li className="nav-auth">
          {isAuthenticated ? (
            <button type="button" className="nav-logout" onClick={logout}>Logout</button>
          ) : (
            <button type="button" className="nav-link" onClick={() => setLoginOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Login</button>
          )}
        </li>
      </ul>
      {loginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onSuccess={() => setLoginOpen(false)}
          login={login}
        />
      )}
    </nav>
  )
}
