import type { Team } from '../types'
import { useDbContext } from '../DbContext'
import './TeamsPreview.css'

interface TeamsPreviewProps {
  teams: Team[]
}

function MemberAvatar({ name, avatar }: { name: string; avatar?: string | null }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
  if (avatar) {
    return (
      <div className="member-avatar member-avatar--img">
        <img src={avatar} alt={name} />
      </div>
    )
  }
  return <div className="member-avatar"><span>{initials}</span></div>
}

export function TeamsPreview({ teams }: TeamsPreviewProps) {
  const { getProductForTeam } = useDbContext()

  return (
    <section id="teams" className="teams-preview section">
      <h2 className="section-title">
        <span className="section-title-icon" style={{ color: 'var(--synth-cyan)' }}>◆</span>
        Teams
      </h2>
      <div className="teams-grid">
        {teams.map((team) => {
          const productId = getProductForTeam(team.id)
          const isAllocated = !!productId
          const displayMembers = team.members.slice(0, 3)
          const avatars = team.memberAvatars ?? []

          return (
            <div
              key={team.id}
              className={`team-card ${isAllocated ? 'allocated' : 'unallocated'}`}
            >
              <h3 className="team-title">{team.name}</h3>
              <div className="team-avatars">
                {displayMembers.map((member, i) => (
                  <MemberAvatar key={member} name={member} avatar={avatars[i]} />
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
