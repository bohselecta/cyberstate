import { useState } from 'react'
import { MapPin, GraduationCap, Route, Shield, Utensils, Trees } from 'lucide-react'

export function NeighborhoodIntel() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const metrics = [
    {
      label: 'SCHOOLS',
      value: 8.5,
      icon: GraduationCap,
      color: 'text-blue-400'
    },
    {
      label: 'WALKABILITY',
      value: 85,
      icon: Route,
      color: 'text-green-400'
    },
    {
      label: 'TRANSIT',
      value: 72,
      icon: MapPin,
      color: 'text-yellow-400'
    },
    {
      label: 'SAFETY',
      value: 'HIGH',
      icon: Shield,
      color: 'text-red-400'
    },
    {
      label: 'RESTAURANTS',
      value: 24,
      icon: Utensils,
      color: 'text-purple-400'
    },
    {
      label: 'PARKS',
      value: 8,
      icon: Trees,
      color: 'text-green-500'
    }
  ]

  return (
    <div className="bg-cyber-bg border border-current pixel-corners">

      {/* Header */}
      <div
        className="p-3 border-b border-current cursor-pointer flex items-center justify-between hover:bg-current hover:text-cyber-bg transition-all"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span className="text-xs font-bold">NEIGHBORHOOD_INTEL</span>
        </div>
        <div className={`text-xs transition-transform ${isCollapsed ? 'rotate-90' : ''}`}>
          ▶
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-3">

          {/* Radial Chart Placeholder */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div className="absolute inset-0 border border-current rounded-full opacity-20"></div>

            {/* Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-cyber-panel border border-current rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">AREA</span>
              </div>
            </div>

            {/* Metric Points */}
            {metrics.map((metric, index) => {
              const angle = (index * 60) - 90 // Start from top
              const radian = (angle * Math.PI) / 180
              const radius = 48
              const x = Math.cos(radian) * radius
              const y = Math.sin(radian) * radius

              return (
              <div
                key={metric.label}
                className="absolute w-4 h-4 bg-current rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                  <metric.icon className={`w-2 h-2 ${metric.color}`} />
                </div>
              )
            })}
          </div>

          {/* Metrics List */}
          <div className="space-y-2">
            {metrics.map((metric) => (
              <div key={metric.label} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <metric.icon className={`w-3 h-3 ${metric.color}`} />
                  <span className="opacity-80">{metric.label}</span>
                </div>
                <span className="font-bold">
                  {typeof metric.value === 'number' && metric.label.includes('SCORE')
                    ? `${metric.value}/100`
                    : metric.value
                  }
                </span>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  )
}
