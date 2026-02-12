import type { Event } from '../types'
import './Hero.css'

interface HeroProps {
  event: Event
}

export function Hero({ event }: HeroProps) {
  return (
    <header className="hero">
      <div className="hero-content">
        <h1 className="hero-title">{event.title}</h1>
        <p className="hero-tagline">{event.tagline}</p>
        <p className="hero-datetime">
          {event.date} • {event.time}
        </p>
      </div>
    </header>
  )
}
