import { useParams, Link } from 'react-router-dom'
import { useDbContext } from '../DbContext'
import type { Team } from '../types'
import { ProductMetrics } from '../components/ProductMetrics'
import './ProductDetail.css'

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { db, loading, error, getTeamsForProduct } = useDbContext()

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

  const product = db.products.find((p) => p.slug === slug)
  if (!product) {
    return (
      <div className="error-screen">
        <p>Product not found</p>
        <Link to="/">Back to home</Link>
      </div>
    )
  }

  const teamIds = getTeamsForProduct(product.id)
  const teams: Team[] = db.teams.filter((t) => teamIds.includes(t.id))

  return (
    <main className="product-detail-page">
      <Link to="/" className="product-detail-back">← Back</Link>

      <article className="product-detail">
        <div className="product-detail-header">
          {product.logo && (
            <img src={product.logo} alt="" className="product-detail-logo" />
          )}
          <div className="product-detail-header-info">
            <h1>{product.name}</h1>
            {product.subtitle && (
              <p className="product-detail-subtitle">{product.subtitle}</p>
            )}
            <ProductMetrics product={product} />
          </div>
        </div>

        {teams.length > 0 && (
          <section className="product-detail-teams">
            <h2>Teams assigned</h2>
            <div className="product-detail-teams-grid">
              {teams.map((team) => {
                const displayMembers = team.members.slice(0, 3)
                const avatars = team.memberAvatars ?? []
                return (
                  <div key={team.id} className="product-detail-team-tile">
                    <h3 className="product-detail-team-tile-title">{team.name}</h3>
                    <div className="product-detail-team-tile-avatars">
                      {displayMembers.map((member, i) => (
                        <div key={member} className="product-detail-member-avatar">
                          {avatars[i] ? (
                            <img src={avatars[i]!} alt={member} />
                          ) : (
                            <span>
                              {member
                                .split(' ')
                                .map((w) => w[0])
                                .join('')
                                .slice(0, 2)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        <section className="product-detail-scope">
          <div
            className="product-detail-content"
            dangerouslySetInnerHTML={{ __html: product.scope }}
          />
        </section>

        {product.caveat && (
          <section className="product-detail-caveat">
            <h2>Caveat</h2>
            <p>{product.caveat}</p>
          </section>
        )}

        {product.nonNegotiables && product.nonNegotiables.length > 0 && (
          <section className="product-detail-nonnegotiables">
            <h2>Non-negotiables</h2>
            <ul>
              {product.nonNegotiables.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  )
}
