const STORAGE_KEY = 'codefest-auth'
const email = import.meta.env.VITE_AUTH_EMAIL ?? 'brendin.duplessis@affiliate.imd.org'
const password = import.meta.env.VITE_AUTH_PASSWORD ?? 'Brendin@123'

export function login(givenEmail: string, givenPassword: string): boolean {
  if (givenEmail === email && givenPassword === password) {
    sessionStorage.setItem(STORAGE_KEY, '1')
    return true
  }
  return false
}

export function logout(): void {
  sessionStorage.removeItem(STORAGE_KEY)
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(STORAGE_KEY) === '1'
}
