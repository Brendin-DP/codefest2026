import { useParams, Link } from 'react-router-dom'
import { useDbContext } from '../DbContext'
import { ProductMetrics } from '../components/ProductMetrics'
import './ProductDetail.css'

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
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

  const product = db.products.find((p) => p.slug === slug)
  if (!product) {
    return (
      <div className="error-screen">
        <p>Product not found</p>
        <Link to="/">Back to home</Link>
      </div>
    )
  }

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

        {product.sanityChecklistPdf && (
          <section className="product-detail-download">
            <a
              href={product.sanityChecklistPdf}
              download
              className="product-detail-download-btn product-detail-download-btn-secondary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download sanity checklist
            </a>
          </section>
        )}
      </article>
    </main>
  )
}
