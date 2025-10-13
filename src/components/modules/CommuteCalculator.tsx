import React, { useState } from 'react'
import { Car, Train, Bike } from 'lucide-react'

export function CommuteCalculator() {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <div className="bg-cyber-bg border border-current pixel-corners">
      <div
        className="p-3 border-b border-current cursor-pointer flex items-center justify-between hover:bg-current hover:text-cyber-bg transition-all"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center space-x-2">
          <Car className="w-4 h-4" />
          <span className="text-xs font-bold">COMMUTE_CALC</span>
        </div>
        <div className={`text-xs transition-transform ${isCollapsed ? 'rotate-90' : ''}`}>
          ▶
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-3 space-y-2">
          <div className="text-xs opacity-70">Enter work address to calculate commute times</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span>DRIVE</span><span>28 min</span></div>
            <div className="flex justify-between"><span>TRANSIT</span><span>45 min</span></div>
            <div className="flex justify-between"><span>BIKE</span><span>22 min</span></div>
          </div>
        </div>
      )}
    </div>
  )
}
