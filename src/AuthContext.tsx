import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { login as doLogin, logout as doLogout, isAuthenticated } from './auth'

interface AuthContextValue {
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(isAuthenticated)

  const login = useCallback((email: string, password: string) => {
    const ok = doLogin(email, password)
    setAuthenticated(ok)
    return ok
  }, [])

  const logout = useCallback(() => {
    doLogout()
    setAuthenticated(false)
  }, [])

  useEffect(() => {
    const handler = () => setAuthenticated(isAuthenticated())
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated: authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
