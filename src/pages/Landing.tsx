import { useState } from 'react'
import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { TeamsPreview } from '../components/TeamsPreview'
import { ProductsPreview } from '../components/ProductsPreview'
import { Allocator } from '../components/Allocator'
import { Login } from '../components/Login'
import { useDbContext } from '../DbContext'
import { useAuth } from '../AuthContext'

export function Landing() {
  const { db, loading, error } = useDbContext()
  const { isAuthenticated } = useAuth()
  const [showLogin, setShowLogin] = useState(false)

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
      <Nav />
      <Hero event={db.event} />
      <div className="landing-sections">
        <TeamsPreview teams={db.teams} />
        <ProductsPreview products={db.products} />
        <section id="assign" className="allocator-section">
          {showLogin && (
            <div className="allocator section">
              <Login onSuccess={() => setShowLogin(false)} />
            </div>
          )}
          <Allocator
            teams={db.teams}
            products={db.products}
            readOnly={!isAuthenticated}
          />
          {!isAuthenticated && !showLogin && (
            <button
              type="button"
              className="allocator-login-btn"
              onClick={() => setShowLogin(true)}
            >
              Login to manage
            </button>
          )}
        </section>
      </div>
    </main>
  )
}
