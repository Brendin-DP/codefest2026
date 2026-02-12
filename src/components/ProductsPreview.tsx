import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { ProductMetrics } from './ProductMetrics'
import './ProductsPreview.css'

interface ProductsPreviewProps {
  products: Product[]
}

export function ProductsPreview({ products }: ProductsPreviewProps) {
  return (
    <section id="products" className="products-preview section">
      <h2>What we&apos;re building</h2>
      <p className="products-subtitle">Pick your challenge—each option has its own trade-offs and rewards.</p>
      <div className="products-list">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.slug}`}
            className="product-card"
          >
            <div className="product-card-image">
              {product.logo ? (
                <img src={product.logo} alt="" className="product-logo" />
              ) : (
                <div className="product-logo-placeholder" />
              )}
            </div>
            <div className="product-card-body">
              <h3 className="product-name">{product.name}</h3>
              {product.subtitle && (
                <p className="product-card-description">{product.subtitle}</p>
              )}
              <ProductMetrics product={product} compact rewardOnly />
            </div>
            <span className="product-arrow">→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
