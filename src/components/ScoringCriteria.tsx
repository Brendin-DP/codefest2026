import './ScoringCriteria.css'

const CRITERIA = [
  'Does it work?',
  'Did you meet the brief?',
  'Did you plan and manage scope wisely?',
  'Did you add meaningful initiative?',
]

export function ScoringCriteria() {
  return (
    <section id="scoring" className="scoring-criteria section">
      <h2 className="section-title">
        <span className="section-title-icon" style={{ color: 'var(--synth-yellow)' }}>★</span>
        Scoring Criteria
      </h2>
      <p className="scoring-criteria-description">
        Your solution will be evaluated on how well it demonstrates these key areas.
      </p>
      <ul className="scoring-criteria-list">
        {CRITERIA.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
