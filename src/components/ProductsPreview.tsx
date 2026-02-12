import { Link } from 'react-router-dom'
import type { Product } from '../types'
import './ProductsPreview.css'

interface ProductsPreviewProps {
  products: Product[]
}

export function ProductsPreview({ products }: ProductsPreviewProps) {
  return (
    <section id="products" className="products-preview section">
      <h2>What we&apos;re building</h2>
      <p className="products-subtitle">Pick your challenge—each option has its own trade-offs and rewards.</p>
      <div className="products-grid">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.slug}`}
            className="product-card"
          >
            {product.logo ? (
              <img src={product.logo} alt="" className="product-logo" />
            ) : null}
            <span className="product-name">{product.name}</span>
            <span className="product-arrow">→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
