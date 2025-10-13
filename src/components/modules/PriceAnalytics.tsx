import React, { useState } from 'react'
import { TrendingUp, DollarSign } from 'lucide-react'

export function PriceAnalytics() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const data = {
    thisListing: 694,
    neighborhoodAvg: 650,
    cityAvg: 580
  }

  const maxValue = Math.max(...Object.values(data))

  return (
    <div className="bg-cyber-bg border border-current pixel-corners">

      {/* Header */}
      <div
        className="p-3 border-b border-current cursor-pointer flex items-center justify-between hover:bg-current hover:text-cyber-bg transition-all"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4" />
          <span className="text-xs font-bold">PRICE_ANALYTICS</span>
        </div>
        <div className={`text-xs transition-transform ${isCollapsed ? 'rotate-90' : ''}`}>
          ▶
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-3 space-y-3">

          {/* Bar Chart */}
          <div className="space-y-2">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <div className="w-20 text-xs opacity-80 truncate">
                  {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                </div>
                <div className="flex-1 bg-cyber-panel border border-current h-4">
                  <div
                    className="h-full bg-current transition-all duration-500"
                    style={{ width: `${(value / maxValue) * 100}%` } as React.CSSProperties}
                  />
                </div>
                <div className="w-12 text-xs font-bold text-right">
                  ${value}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Metrics */}
          <div className="space-y-1 text-xs border-t border-current pt-2">
            <div className="flex justify-between">
              <span className="opacity-80">ESTIMATED_VALUE</span>
              <span className="font-bold glow-text">$1,275,000</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-80">VALUE_TREND</span>
              <div className="flex items-center space-x-1">
                <span className="font-bold text-green-400">+5.2%</span>
                <TrendingUp className="w-3 h-3 text-green-400" />
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  )
}
