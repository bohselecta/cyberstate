import { useState } from 'react'
import { Coffee, Trees } from 'lucide-react'

export function NearbyAmenities() {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <div className="bg-cyber-bg border border-current pixel-corners">
      <div
        className="p-3 border-b border-current cursor-pointer flex items-center justify-between hover:bg-current hover:text-cyber-bg transition-all"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center space-x-2">
          <Coffee className="w-4 h-4" />
          <span className="text-xs font-bold">NEARBY</span>
        </div>
        <div className={`text-xs transition-transform ${isCollapsed ? 'rotate-90' : ''}`}>
          ▶
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-3 space-y-2 text-xs">
          <div className="flex justify-between"><span>COFFEE_SHOPS</span><span>3 within 0.5mi</span></div>
          <div className="flex justify-between"><span>GROCERIES</span><span>2 within 1mi</span></div>
          <div className="flex justify-between"><span>FITNESS</span><span>5 within 1mi</span></div>
          <div className="flex justify-between"><span>HEALTHCARE</span><span>2 within 2mi</span></div>
        </div>
      )}
    </div>
  )
}
