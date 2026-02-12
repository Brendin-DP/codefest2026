import type { Team } from '../types'
import { useDbContext } from '../DbContext'
import './TeamsPreview.css'

interface TeamsPreviewProps {
  teams: Team[]
}

function MemberAvatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
  return <div className="member-avatar"><span>{initials}</span></div>
}

export function TeamsPreview({ teams }: TeamsPreviewProps) {
  const { getProductForTeam } = useDbContext()

  return (
    <section id="teams" className="teams-preview section">
      <h2>Teams</h2>
      <div className="teams-grid">
        {teams.map((team) => {
          const productId = getProductForTeam(team.id)
          const isAllocated = !!productId
          const displayMembers = team.members.slice(0, 2)

          return (
            <div
              key={team.id}
              className={`team-card ${isAllocated ? 'allocated' : 'unallocated'}`}
            >
              <h3 className="team-title">{team.name}</h3>
              <div className="team-avatars">
                {displayMembers.map((member) => (
                  <MemberAvatar key={member} name={member} />
                ))}
              </div>
              {isAllocated && (
                <span className="team-status">Assigned</span>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
