import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDbContext } from '../DbContext'
import { Hero } from '../components/Hero'
import { ProgramOverview } from '../components/ProgramOverview'
import { TeamsPreview } from '../components/TeamsPreview'
import { ProductsPreview } from '../components/ProductsPreview'
import { ScoringCriteria } from '../components/ScoringCriteria'

export function Landing() {
  const { db, loading, error } = useDbContext()
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }))
    }
  }, [hash])

  if (loading) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (error || !db) {
    return (
      <div className="error-screen">
        <p>{error ?? 'Failed to load data'}</p>
      </div>
    )
  }

  return (
    <div className="landing-page">
      <Hero event={db.event} />
      <div className="landing-sections">
        <ProgramOverview />
        <TeamsPreview teams={db.teams} />
        <ProductsPreview products={db.products} />
        <ScoringCriteria />
      </div>
    </div>
  )
}
