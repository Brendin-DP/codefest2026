import type { Product } from '../types'
import './ProductMetrics.css'

interface ProductMetricsProps {
  product: Product
  compact?: boolean
  rewardOnly?: boolean
}

export function ProductMetrics({ product, compact = false, rewardOnly = false }: ProductMetricsProps) {
  const diff = product.difficulty ?? 0
  const reward = product.reward ?? 0

  const fire = '🔥'
  const star = '⭐'
  const fireStr = fire.repeat(Math.min(diff, 5))
  const starStr = star.repeat(Math.min(reward, 5))

  if (compact && rewardOnly) {
    if (reward === 0) return null
    return (
      <div className="product-metrics product-metrics--compact product-metrics--reward-only">
        <span className="product-metrics-label">Reward</span>
        <span>{starStr}</span>
      </div>
    )
  }

  if (diff === 0 && reward === 0) return null

  if (compact) {
    return (
      <div className="product-metrics product-metrics--compact product-metrics--tile">
        {diff > 0 && (
          <div className="product-metrics-inline">
            <span className="product-metrics-label">Difficulty</span>
            <span>{fireStr}</span>
          </div>
        )}
        {reward > 0 && (
          <div className="product-metrics-inline">
            <span className="product-metrics-label">Reward</span>
            <span>{starStr}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="product-metrics product-metrics--stacked">
      {diff > 0 && (
        <div className="product-metric-line">
          <span className="product-metric-label">Difficulty</span>
          <span>{fireStr}</span>
        </div>
      )}
      {reward > 0 && (
        <div className="product-metric-line">
          <span className="product-metric-label">Reward</span>
          <span>{starStr}</span>
        </div>
      )}
    </div>
  )
}
