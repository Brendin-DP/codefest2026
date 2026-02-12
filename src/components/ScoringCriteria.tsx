import './ScoringCriteria.css'

const LEVELS = [
  {
    title: 'Foundation',
    subtitle: 'Bare Minimum Delivered',
    bullets: [
      'All critical non-negotiables are met.',
      'The core flow works end-to-end.',
      'The product functions as described in the brief.',
    ],
    filled: 1,
  },
  {
    title: 'Crossed the Halfway Mark',
    subtitle: 'Major Scope Delivered',
    bullets: [
      'More than half of the defined scope is complete.',
      'The main vertical is coherent and usable.',
      'Gaps are minor and do not break the core experience.',
    ],
    filled: 2,
  },
  {
    title: 'Completed Majority',
    subtitle: 'Strong Completion',
    bullets: [
      'Most of the defined scope is delivered (75%+).',
      'The product feels stable, intentional, and complete.',
      'Trade-offs are clear and well executed.',
    ],
    filled: 3,
  },
]

const LEVEL_COLORS = ['red', 'yellow', 'green'] as const

function LevelBar({ filled, levelIndex }: { filled: number; levelIndex: number }) {
  const colorClass = LEVEL_COLORS[levelIndex] ?? 'red'
  return (
    <div className="scoring-level-bar" aria-hidden>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`scoring-level-segment ${i <= filled ? `filled-${colorClass}` : 'empty'}`}
        />
      ))}
    </div>
  )
}

export function ScoringCriteria() {
  return (
    <section id="scoring" className="scoring-criteria section">
      <h2 className="section-title">
        <span className="section-title-icon" style={{ color: 'var(--synth-yellow)' }}>🔥</span>
        How We&apos;re Scoring
      </h2>
      <p className="scoring-criteria-description">
        You can unlock multiple levels of rewards based on how complete your delivery is.
      </p>
      <div className="scoring-levels">
        {LEVELS.map((level, i) => (
          <div key={i} className="scoring-level-row">
            <LevelBar filled={level.filled} levelIndex={i} />
            <div className="scoring-level-content">
              <h3 className="scoring-level-title">
                Level {i + 1} Reward — {level.title}
              </h3>
              <p className="scoring-level-subtitle">{level.subtitle}</p>
              <ul className="scoring-level-bullets">
                {level.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <p className="scoring-completion-message">
        💡 Completion matters more than ambition or initiative.
      </p>
      <div className="scoring-danger-alert" role="alert">
        <span className="scoring-danger-icon" aria-hidden>⚠️</span>
        <p>
          Failure to meet the bare minimum requirements will result in catastrophic failure and
          reward will be forfeited.
        </p>
      </div>
    </section>
  )
}
