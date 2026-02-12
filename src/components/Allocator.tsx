import type { Team, Product } from '../types'
import { useDbContext } from '../DbContext'
import './Allocator.css'

interface AllocatorProps {
  teams: Team[]
  products: Product[]
  readOnly?: boolean
}

export function Allocator({ teams, products, readOnly = false }: AllocatorProps) {
  const {
    getUnallocatedTeams,
    getTeamsForProduct,
    assignTeam,
    unassignTeam,
    exportAllocations,
  } = useDbContext()

  const unallocated = getUnallocatedTeams(teams)

  const handleCopyExport = () => {
    const json = exportAllocations()
    navigator.clipboard.writeText(json)
    alert('Allocations copied to clipboard. Paste into db.json "allocations" field and redeploy.')
  }

  return (
    <section className={`allocator section ${readOnly ? 'allocator-readonly' : ''}`}>
      <h2>Assign teams</h2>
      <p className="allocator-hint">
        {readOnly
          ? 'View-only. Sign in to add or remove team allocations.'
          : 'Add teams to products. Changes save to this device. Use Export to update db.json for everyone.'}
      </p>

      <div className="allocator-unallocated">
        <h3>Unallocated</h3>
        {unallocated.length === 0 ? (
          <p className="allocator-empty">All teams assigned.</p>
        ) : (
          <div className="allocator-unallocated-list">
            {unallocated.map((team) => (
              <span key={team.id} className="allocator-team-badge unallocated">
                {team.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="allocator-products">
        {products.map((product) => {
          const assignedIds = getTeamsForProduct(product.id)
          const assigned = teams.filter((t) => assignedIds.includes(t.id))

          return (
            <div key={product.id} className="allocator-product">
              <h4>{product.name}</h4>
              <div className="allocator-assigned">
                {assigned.map((team) => (
                  <span key={team.id} className="allocator-team-badge assigned">
                    {team.name}
                    {!readOnly && (
                      <button
                        type="button"
                        onClick={() => unassignTeam(product.id, team.id)}
                        className="allocator-remove"
                        aria-label={`Remove ${team.name} from ${product.name}`}
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {!readOnly && unallocated.length > 0 && (
                <div className="allocator-add">
                  {unallocated.map((team) => (
                    <button
                      key={team.id}
                      type="button"
                      onClick={() => assignTeam(product.id, team.id)}
                      className="allocator-add-btn"
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

      {!readOnly && (
        <button type="button" onClick={handleCopyExport} className="allocator-export">
          Export allocations (copy JSON)
        </button>
      )}
    </section>
  )
}
