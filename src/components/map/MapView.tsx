import React from 'react'
import { Map, ZoomIn, ZoomOut, RotateCcw, Layers, Maximize } from 'lucide-react'
import { useData } from '../../context/DataContext'

export function MapView() {
  const { setLayoutState, selectedListing } = useData()

  return (
    <div className="w-full h-full bg-cyber-bg border border-current flex flex-col">

      {/* Map Header */}
      <div className="p-4 border-b border-current flex items-center justify-between">
        <h3 className="text-sm font-bold glow-text">◢ MAP VIEW ◣</h3>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setLayoutState('map-expanded')}
            className="p-2 border border-current hover:bg-current hover:text-cyber-bg transition-all"
            aria-label="Expand Map"
          >
            <Maximize className="w-4 h-4" />
          </button>
          <button
            className="p-2 border border-current hover:bg-current hover:text-cyber-bg transition-all"
            aria-label="Toggle Layers"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Container - Placeholder for now */}
      <div className="flex-1 relative bg-cyber-panel border border-current m-2">

        {/* Placeholder Map Content */}
        <div className="w-full h-full flex items-center justify-center bg-cyber-bg pixel-corners">
          <div className="text-center">
            <Map className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <div className="text-sm font-mono">MAPBOX GL JS INTEGRATION</div>
            <div className="text-xs opacity-70 mt-2">
              Interactive Map Component<br/>
              Custom Markers • Clustering • Heat Maps
            </div>
          </div>
        </div>

        {/* Selected Property Indicator */}
        {selectedListing && (
          <div className="absolute top-4 left-4 bg-cyber-panel border border-current p-2 text-xs">
            <div className="font-bold">{selectedListing.address.split(',')[0]}</div>
            <div className="opacity-80">${selectedListing.price.toLocaleString()}</div>
          </div>
        )}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-1">
          <button
            className="w-8 h-8 bg-cyber-panel border border-current flex items-center justify-center hover:bg-current hover:text-cyber-bg transition-all"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            className="w-8 h-8 bg-cyber-panel border border-current flex items-center justify-center hover:bg-current hover:text-cyber-bg transition-all"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            className="w-8 h-8 bg-cyber-panel border border-current flex items-center justify-center hover:bg-current hover:text-cyber-bg transition-all"
            aria-label="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Grid Overlay Toggle */}
        <div className="absolute bottom-4 right-4">
          <button className="px-3 py-1 text-xs border border-current hover:bg-current hover:text-cyber-bg transition-all">
            GRID OVERLAY
          </button>
        </div>

      </div>

    </div>
  )
}
