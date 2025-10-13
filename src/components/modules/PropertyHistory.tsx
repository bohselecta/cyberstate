import React, { useState } from 'react'
import { Clock, DollarSign, Tag, Hammer } from 'lucide-react'

export function PropertyHistory() {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <div className="bg-cyber-bg border border-current pixel-corners">
      <div
        className="p-3 border-b border-current cursor-pointer flex items-center justify-between hover:bg-current hover:text-cyber-bg transition-all"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span className="text-xs font-bold">PROPERTY_HISTORY</span>
        </div>
        <div className={`text-xs transition-transform ${isCollapsed ? 'rotate-90' : ''}`}>
          ▶
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-3 space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <Tag className="w-3 h-3" />
            <span>LISTED: 2024-01-15 • $1,250,000</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-3 h-3" />
            <span>SOLD: 2023-08-20 • $1,180,000</span>
          </div>
          <div className="flex items-center space-x-2">
            <Hammer className="w-3 h-3" />
            <span>BUILT: 1995</span>
          </div>
        </div>
      )}
    </div>
  )
}
