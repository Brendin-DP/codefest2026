import { useState, useEffect, useCallback } from 'react'
import type { Db } from './types'

const API_DB = '/api/db'
const DB_PATH = '/db.json'

export function useDb() {
  const [db, setDb] = useState<Db | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDb = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    setError(null)
    const opts = { cache: 'no-store' as RequestCache }
    try {
      let res: Response
      try {
        res = await fetch(API_DB, opts)
        if (!res.ok) res = await fetch(DB_PATH, opts)
      } catch {
        res = await fetch(DB_PATH, opts)
      }
      if (!res.ok) throw new Error('Failed to fetch')
      const data: Db = await res.json()
      setDb(data)
    } catch (e) {
      if (!silent) setError(e instanceof Error ? e.message : 'Failed to load data')
    } finally {
      if (!silent) setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDb()
  }, [fetchDb])

  return {
    db,
    loading,
    error,
    refetch: fetchDb,
  }
}
