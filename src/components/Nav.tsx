import { useAuth } from '../AuthContext'
import './Nav.css'

const sections = [
  { id: 'teams', label: 'Teams' },
  { id: 'products', label: 'Products' },
  { id: 'assign', label: 'Assign' },
]

export function Nav() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav className="nav">
      <ul className="nav-list">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {label}
            </a>
          </li>
        ))}
        <li className="nav-auth">
          {isAuthenticated ? (
            <button type="button" className="nav-logout" onClick={logout}>
              Logout
            </button>
          ) : (
            <a href="#assign" className="nav-link" onClick={(e) => {
              e.preventDefault()
              document.getElementById('assign')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Login
            </a>
          )}
        </li>
      </ul>
    </nav>
  )
}
