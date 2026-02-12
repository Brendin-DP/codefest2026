import { createContext, useContext, type ReactNode } from 'react'

type DbContextValue = ReturnType<typeof import('./useDb').useDb>

const DbContext = createContext<DbContextValue | null>(null)

export function DbProvider({ children, value }: { children: ReactNode; value: DbContextValue }) {
  return <DbContext.Provider value={value}>{children}</DbContext.Provider>
}

export function useDbContext(): DbContextValue {
  const ctx = useContext(DbContext)
  if (!ctx) throw new Error('useDbContext must be used within DbProvider')
  return ctx
}
