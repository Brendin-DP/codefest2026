const AUTH_KEY = 'codefest-authenticated'

const expectedEmail = import.meta.env.VITE_AUTH_EMAIL ?? ''
const expectedPassword = import.meta.env.VITE_AUTH_PASSWORD ?? ''

export function login(email: string, password: string): boolean {
  if (!expectedEmail || !expectedPassword) {
    return false
  }
  if (email === expectedEmail && password === expectedPassword) {
    sessionStorage.setItem(AUTH_KEY, '1')
    return true
  }
  return false
}

export function logout(): void {
  sessionStorage.removeItem(AUTH_KEY)
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === '1'
}

export function hasAuthConfigured(): boolean {
  return !!(expectedEmail && expectedPassword)
}
