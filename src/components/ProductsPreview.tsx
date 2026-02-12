import { Link } from 'react-router-dom'
import type { Product } from '../types'
import './ProductsPreview.css'

interface ProductsPreviewProps {
  products: Product[]
}

export function ProductsPreview({ products }: ProductsPreviewProps) {
  return (
    <section className="products-preview section">
      <h2>What we&apos;re building</h2>
      <div className="products-grid">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.slug}`}
            className="product-card"
          >
            <span className="product-name">{product.name}</span>
            <span className="product-arrow">→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
