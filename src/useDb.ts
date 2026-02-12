import { useState, useEffect, useCallback } from 'react'
import type { Db, Allocations } from './types'

const ALLOCATIONS_KEY = 'codefest-allocations'

function getStoredAllocations(): Allocations | null {
  try {
    const raw = localStorage.getItem(ALLOCATIONS_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Allocations
    return typeof parsed === 'object' && parsed !== null ? parsed : null
  } catch {
    return null
  }
}

function setStoredAllocations(allocations: Allocations): void {
  localStorage.setItem(ALLOCATIONS_KEY, JSON.stringify(allocations))
}

export function useDb() {
  const [db, setDb] = useState<Db | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [allocations, setAllocationsState] = useState<Allocations>({})

  useEffect(() => {
    fetch('/db.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load db.json')
        return res.json() as Promise<Db>
      })
      .then((data) => {
        setDb(data)
        const stored = getStoredAllocations()
        setAllocationsState(stored ?? data.allocations ?? {})
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const setAllocations = useCallback((next: Allocations | ((prev: Allocations) => Allocations)) => {
    setAllocationsState((prev) => {
      const nextVal = typeof next === 'function' ? next(prev) : next
      setStoredAllocations(nextVal)
      return nextVal
    })
  }, [])

  const assignTeam = useCallback(
    (productId: string, teamId: string) => {
      setAllocations((prev) => {
        const productTeams = [...(prev[productId] ?? [])]
        if (productTeams.includes(teamId)) return prev
        productTeams.push(teamId)
        return { ...prev, [productId]: productTeams }
      })
    },
    [setAllocations]
  )

  const unassignTeam = useCallback(
    (productId: string, teamId: string) => {
      setAllocations((prev) => {
        const productTeams = (prev[productId] ?? []).filter((id) => id !== teamId)
        if (productTeams.length === 0) {
          const { [productId]: _, ...rest } = prev
          return rest
        }
        return { ...prev, [productId]: productTeams }
      })
    },
    [setAllocations]
  )

  const getUnallocatedTeams = useCallback(
    <T extends { id: string }>(teams: T[]): T[] => {
      if (!teams.length) return []
      const assigned = new Set(Object.values(allocations).flat())
      return teams.filter((t) => !assigned.has(t.id))
    },
    [allocations]
  )

  const getTeamsForProduct = useCallback(
    (productId: string) => allocations[productId] ?? [],
    [allocations]
  )

  const getProductForTeam = useCallback(
    (teamId: string) => {
      for (const [productId, teamIds] of Object.entries(allocations)) {
        if (teamIds.includes(teamId)) return productId
      }
      return null
    },
    [allocations]
  )

  const exportAllocations = useCallback(() => {
    return JSON.stringify(allocations, null, 2)
  }, [allocations])

  return {
    db,
    loading,
    error,
    allocations,
    setAllocations,
    assignTeam,
    unassignTeam,
    getUnallocatedTeams,
    getTeamsForProduct,
    getProductForTeam,
    exportAllocations,
  }
}
