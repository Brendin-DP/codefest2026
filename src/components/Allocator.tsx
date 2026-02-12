import { useAuth } from '../AuthContext'
import { useDbContext } from '../DbContext'
import type { Team } from '../types'
import './Allocator.css'

export function Allocator() {
  const { isAuthenticated } = useAuth()
  const { db, allocations, setAllocation, setAllocations, getTeamsForProduct } = useDbContext()

  if (!db) return null

  const handleAssign = (productId: string, teamId: string) => {
    const current = getTeamsForProduct(productId)
    if (current.includes(teamId)) return
    const next: typeof allocations = {}
    for (const [pid, teamIds] of Object.entries(allocations)) {
      const updated = pid === productId
        ? [...(teamIds ?? []), teamId]
        : (teamIds ?? []).filter((id) => id !== teamId)
      if (updated.length > 0) next[pid] = updated
    }
    if (!(productId in next)) next[productId] = [teamId]
    setAllocations(next)
  }

  const handleUnassign = (productId: string, teamId: string) => {
    const current = getTeamsForProduct(productId)
    setAllocation(productId, current.filter((id) => id !== teamId))
  }

  const assignedTeamIds = new Set<string>(
    Object.values(allocations).flat()
  )
  const unallocatedTeams = db.teams.filter((t) => !assignedTeamIds.has(t.id))

  const exportAllocations = () => {
    const payload = JSON.stringify({ allocations }, null, 2)
    navigator.clipboard.writeText(payload).then(
      () => alert('Allocations copied to clipboard. Paste into db.json "allocations" when the API is unavailable.'),
      () => alert('Could not copy to clipboard.')
    )
  }

  return (
    <section id="assignment" className="allocator section allocator-section">
      <h2>Assignment</h2>
      <p className="allocator-hint">
        {isAuthenticated
          ? 'Assign teams to products. Changes save automatically.'
          : 'Log in to manage team assignments.'}
      </p>

      <div className="allocator-unallocated">
        <h3>Unallocated teams</h3>
        {unallocatedTeams.length === 0 ? (
          <p className="allocator-empty">All teams are assigned.</p>
        ) : (
          <div className="allocator-unallocated-list">
            {unallocatedTeams.map((team) => (
              <span key={team.id} className="allocator-team-badge unallocated">{team.name}</span>
            ))}
          </div>
        )}
      </div>

      <div className="allocator-products">
        {db.products.map((product) => {
          const teamIds = getTeamsForProduct(product.id)
          const teams: Team[] = db.teams.filter((t) => teamIds.includes(t.id))
          return (
            <div key={product.id} className="allocator-product">
              <h4>{product.name}</h4>
              <div className="allocator-assigned">
                {teams.map((team) => (
                  <span key={team.id} className="allocator-team-badge assigned">
                    {team.name}
                    {isAuthenticated && (
                      <button
                        type="button"
                        className="allocator-remove"
                        aria-label={`Remove ${team.name}`}
                        onClick={() => handleUnassign(product.id, team.id)}
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {isAuthenticated && (
                <div className="allocator-add">
                  {unallocatedTeams.map((team) => (
                    <button
                      key={team.id}
                      type="button"
                      className="allocator-add-btn"
                      onClick={() => handleAssign(product.id, team.id)}
                    >
                      + {team.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {isAuthenticated && (
        <button type="button" className="allocator-export" onClick={exportAllocations}>
          Export allocations (copy JSON)
        </button>
      )}
    </section>
  )
}
