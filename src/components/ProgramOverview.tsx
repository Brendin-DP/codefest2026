import './ProgramOverview.css'

const PROGRAM_ITEMS = [
  { time: '07:00', title: 'Kickoff', description: 'Purpose, expectations, completion levels and judging criteria.\nClarification of non-negotiables.' },
  { time: '07:20', title: 'Challenge Reveal', description: 'Presentation of Atlas Systems and Mainframe.\nMainframe assigned to QA.\nShort clarification window.' },
  { time: '07:35', title: 'Team Alignment', description: 'Teams confirm challenge and align on approach.\nNo forced planning — how you work will be visible.' },
  { time: '07:50', title: 'Build Block 1', description: 'Deep work.\nMinimal interruption.' },
  { time: '12:00', title: 'Lunch', description: 'Reset and reassess scope.' },
  { time: '12:30', title: 'Build Block 2', description: 'Converge, cut scope where necessary, stabilise core flows.' },
  { time: '15:00', title: 'Stabilisation Call', description: 'No new features.\nFocus on demo readiness.' },
  { time: '16:00', title: 'Demos', description: '5 minutes demo\n5 minutes Q&A\n\nFocus: problem solved, trade-offs made, what was deliberately not built.' },
  { time: '16:45', title: 'Panel Deliberation', description: 'Independent scoring.\nCompletion level applied.' },
  { time: '16:55', title: 'Prizes & Close', description: 'Completion levels announced.\nCategory awards.\nEvent close.' },
]

export function ProgramOverview() {
  return (
    <section id="program" className="program-overview section">
      <h2 className="section-title">
        <span className="section-title-icon" style={{ color: 'var(--synth-orange)' }}>▸</span>
        Program Overview
      </h2>
      <div className="program-timeline">
        {PROGRAM_ITEMS.map((item, i) => (
          <div key={i} className="program-item">
            <div className="program-item-header">
              <span className="program-time">{item.time}</span>
              <span className="program-separator">–</span>
              <h3 className="program-title">{item.title}</h3>
            </div>
            <p className="program-description">
              {item.description.split('\n').map((line, j) => (
                <span key={j}>
                  {line}
                  {j < item.description.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
