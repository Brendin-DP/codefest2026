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
          <div>
            <h1>{product.name}</h1>
            {product.subtitle && (
              <p className="product-detail-subtitle">{product.subtitle}</p>
            )}
          </div>
        </div>
        <ProductMetrics product={product} />

        <section className="product-detail-scope">
          <h2>Scope</h2>
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

        {product.risk && (
          <section className="product-detail-risk">
            <h2>Risk</h2>
            <p>{product.risk}</p>
          </section>
        )}

        {teams.length > 0 && (
          <section className="product-detail-teams">
            <h2>Assigned teams</h2>
            <ul>
              {teams.map((team) => (
                <li key={team.id}>{team.name}</li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  )
}
