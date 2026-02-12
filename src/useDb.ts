import { useState, useEffect, useCallback } from 'react'
import type { Db, Allocations } from './types'

const API_BASE = '/api'
const DB_PATH = '/db.json'
const LOCALSTORAGE_KEY = 'codefest-allocations'

function getStoredAllocations(): Allocations | null {
  try {
    const raw = localStorage.getItem(LOCALSTORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? parsed : null
  } catch {
    return null
  }
}

function setStoredAllocations(allocations: Allocations) {
  try {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(allocations))
  } catch {
    // ignore
  }
}

export function useDb() {
  const [db, setDb] = useState<Db | null>(null)
  const [allocations, setAllocationsState] = useState<Allocations>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDb = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/db`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data: Db = await res.json()
      const allocs = data.allocations ?? {}
      setDb(data)
      setAllocationsState(allocs)
      setStoredAllocations(allocs)
    } catch {
      try {
        const res = await fetch(DB_PATH)
        if (!res.ok) throw new Error('Failed to fetch db.json')
        const data: Db = await res.json()
        const fromApi = data.allocations ?? {}
        const fromStorage = getStoredAllocations()
        setDb(data)
        setAllocationsState(
          fromStorage && Object.keys(fromStorage).length > 0 ? fromStorage : fromApi
        )
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load data')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDb()
  }, [fetchDb])

  const saveAllocations = useCallback(async (next: Allocations) => {
    try {
      const res = await fetch(`${API_BASE}/allocations`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ allocations: next }),
      })
      if (res.ok) {
        setStoredAllocations(next)
        return
      }
    } catch {
      // API unavailable – fall through to localStorage
    }
    setStoredAllocations(next)
  }, [])

  useEffect(() => {
    const handler = () => {
      const stored = getStoredAllocations()
      if (stored && Object.keys(stored).length >= 0) {
        setAllocationsState(stored)
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const setAllocation = useCallback(
    (productId: string, teamIds: string[]) => {
      const next: Allocations = {
        ...allocations,
        [productId]: teamIds,
      }
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
