import { useState, useEffect, useCallback } from 'react'
import type { Db, Allocations } from './types'

const API_DB = '/api/db'
const DB_PATH = '/db.json'

export function useDb() {
  const [db, setDb] = useState<Db | null>(null)
  const [allocations, setAllocationsState] = useState<Allocations>({})
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
      setAllocationsState(data.allocations ?? {})
    } catch (e) {
      if (!silent) setError(e instanceof Error ? e.message : 'Failed to load data')
    } finally {
      if (!silent) setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDb()
  }, [fetchDb])

  const saveAllocations = useCallback(async (next: Allocations) => {
    try {
      const res = await fetch('/api/allocations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ allocations: next }),
        cache: 'no-store',
      })
      if (res.ok) {
        fetchDb(true)
        return
      }
      console.error('[useDb] Save failed:', res.status, await res.text())
    } catch (e) {
      console.error('[useDb] Save error:', e)
    }
  }, [fetchDb])

  const setAllocation = useCallback(
    (productId: string, teamIds: string[]) => {
      const next: Allocations = { ...allocations, [productId]: teamIds }
      setAllocationsState(next)
      saveAllocations(next)
    },
    [allocations, saveAllocations]
  )

  const setAllocations = useCallback(
    (next: Allocations) => {
      setAllocationsState(next)
      saveAllocations(next)
    },
    [saveAllocations]
  )

  const getTeamsForProduct = useCallback(
    (productId: string): string[] => allocations[productId] ?? [],
    [allocations]
  )

  const getProductForTeam = useCallback(
    (teamId: string): string | null => {
      for (const [pid, teamIds] of Object.entries(allocations)) {
        if (teamIds.includes(teamId)) return pid
      }
      return null
    },
    [allocations]
  )

  return {
    db,
    allocations,
    setAllocation,
    setAllocations,
    getTeamsForProduct,
    getProductForTeam,
    loading,
    error,
    refetch: fetchDb,
  }
}
