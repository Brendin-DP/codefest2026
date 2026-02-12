import type { Product } from '../types'
import './ProductMetrics.css'

interface ProductMetricsProps {
  product: Product
  compact?: boolean
}

export function ProductMetrics({ product, compact = false }: ProductMetricsProps) {
  const diff = product.difficulty ?? 0
  const risk = product.riskLevel ?? 0
  const reward = product.reward ?? 0

  if (diff === 0 && risk === 0 && reward === 0) return null

  const fire = '🔥'
  const star = '⭐'
  const fireStr = fire.repeat(Math.min(diff, 5))
  const riskStr = fire.repeat(Math.min(risk, 5))
  const starStr = star.repeat(Math.min(reward, 5))

  if (compact) {
    return (
      <div className="product-metrics product-metrics--compact">
        <span title="Difficulty">{fireStr}</span>
        <span title="Risk">{riskStr}</span>
        <span title="Reward">{starStr}</span>
      </div>
    )
  }

  return (
    <div className="product-metrics">
      <span className="product-metric">
        <em>Difficulty</em> {fire.repeat(Math.min(diff, 5))}
      </span>
      <span className="product-metric">
        <em>Risk</em> {fire.repeat(Math.min(risk, 5))}
      </span>
      <span className="product-metric">
        <em>Reward</em> {star.repeat(Math.min(reward, 5))}
      </span>
    </div>
  )
}
