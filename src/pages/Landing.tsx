import { Hero } from '../components/Hero'
import { TeamsPreview } from '../components/TeamsPreview'
import { ProductsPreview } from '../components/ProductsPreview'
import { Allocator } from '../components/Allocator'
import { useDbContext } from '../DbContext'

export function Landing() {
  const { db, loading, error } = useDbContext()

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
    <main className="landing-page">
      <Hero event={db.event} />
      <div className="landing-sections">
        <TeamsPreview teams={db.teams} />
        <ProductsPreview products={db.products} />
        <Allocator teams={db.teams} products={db.products} />
      </div>
    </main>
  )
}
