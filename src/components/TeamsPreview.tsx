import type { Team } from '../types'
import { useDbContext } from '../DbContext'
import './TeamsPreview.css'

interface TeamsPreviewProps {
  teams: Team[]
}

function TeamAvatar({ team }: { team: Team }) {
  const initials = team.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
  return (
    <div className="team-avatar">
      {team.avatar ? (
        <img src={team.avatar} alt="" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}

export function TeamsPreview({ teams }: TeamsPreviewProps) {
  const { getProductForTeam } = useDbContext()

  return (
    <section className="teams-preview section">
      <h2>Teams</h2>
      <div className="teams-grid">
        {teams.map((team) => {
          const productId = getProductForTeam(team.id)
          const isAllocated = !!productId

          return (
            <div
              key={team.id}
              className={`team-card ${isAllocated ? 'allocated' : 'unallocated'}`}
            >
              <TeamAvatar team={team} />
              <div className="team-info">
                <span className="team-name">{team.name}</span>
                <span className="team-members">{team.members.join(', ')}</span>
                {isAllocated && (
                  <span className="team-status">Assigned</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
