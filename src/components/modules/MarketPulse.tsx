import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'

export function MarketPulse() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [metrics, setMetrics] = useState({
    avgPrice: 1250000,
    daysOnMarket: 28,
    inventory: 245,
    priceChange: 2.3
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        avgPrice: prev.avgPrice + (Math.random() - 0.5) * 1000,
        daysOnMarket: Math.max(1, prev.daysOnMarket + (Math.random() - 0.5) * 2),
        inventory: Math.max(0, prev.inventory + Math.floor((Math.random() - 0.5) * 10)),
        priceChange: prev.priceChange + (Math.random() - 0.5) * 0.5
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="bg-cyber-bg border border-current pixel-corners">

      {/* Header */}
      <div
        className="p-3 border-b border-current cursor-pointer flex items-center justify-between hover:bg-current hover:text-cyber-bg transition-all"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4" />
          <span className="text-xs font-bold">MARKET_PULSE</span>
        </div>
        <div className={`text-xs transition-transform ${isCollapsed ? 'rotate-90' : ''}`}>
          ▶
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-3 space-y-3">

          {/* Average Price */}
          <div className="flex items-center justify-between">
            <div className="text-xs opacity-80">AVG_PRICE</div>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-bold glow-text">
                {formatCurrency(metrics.avgPrice)}
              </span>
              {metrics.priceChange > 0 ? (
                <TrendingUp className="w-3 h-3 text-green-400" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-400" />
              )}
            </div>
          </div>

          {/* Days on Market */}
          <div className="flex items-center justify-between">
            <div className="text-xs opacity-80">DAYS_ON_MARKET</div>
            <div className="text-sm font-bold">
              {Math.round(metrics.daysOnMarket)}
            </div>
          </div>

          {/* Inventory */}
          <div className="flex items-center justify-between">
            <div className="text-xs opacity-80">INVENTORY</div>
            <div className="text-sm font-bold">
              {metrics.inventory}
            </div>
          </div>

          {/* Sparkline placeholder */}
          <div className="h-8 bg-cyber-panel border border-current rounded flex items-end justify-center space-x-1 p-1">
            {Array.from({ length: 12 }, (_, i) => {
              const height = `${20 + Math.random() * 60}%`
              return (
                <div
                  key={i}
                  className="w-1 bg-current opacity-60"
                  style={{ height }}
                />
              )
            })}
          </div>

        </div>
      )}

    </div>
  )
}
