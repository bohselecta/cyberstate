import React from 'react'
import { MarketPulse } from '../modules/MarketPulse'
import { NeighborhoodIntel } from '../modules/NeighborhoodIntel'
import { PriceAnalytics } from '../modules/PriceAnalytics'
import { CommuteCalculator } from '../modules/CommuteCalculator'
import { MortgageCalculator } from '../modules/MortgageCalculator'
import { NearbyAmenities } from '../modules/NearbyAmenities'
import { PropertyHistory } from '../modules/PropertyHistory'

export function SidebarRight() {
  return (
    <div className="w-full h-full bg-cyber-panel border border-current flex flex-col cyber-glow overflow-y-auto">

      {/* Header */}
      <div className="p-4 border-b border-current">
        <h3 className="text-sm font-bold glow-text">◢ DATA MODULES ◣</h3>
        <div className="text-xs opacity-70 mt-1">
          Analytics & Intelligence
        </div>
      </div>

      {/* Scrollable Modules Stack */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3">

        <MarketPulse />
        <NeighborhoodIntel />
        <PriceAnalytics />
        <CommuteCalculator />
        <MortgageCalculator />
        <NearbyAmenities />
        <PropertyHistory />

      </div>

    </div>
  )
}
