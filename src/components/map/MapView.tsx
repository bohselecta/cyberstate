import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useData } from '../../context/DataContext'
import { useTheme } from '../../context/ThemeContext'

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom cyberpunk marker
const createCyberMarker = (color: string) => {
  return L.divIcon({
    className: 'cyber-marker',
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background: ${color};
        border: 2px solid #111111;
        border-radius: 50%;
        box-shadow: 0 0 10px ${color};
        animation: pulse 2s infinite;
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  })
}

// Component to handle map updates
function MapUpdater() {
  const map = useMap()
  const { selectedListing } = useData()

  useEffect(() => {
    if (selectedListing) {
      map.flyTo([selectedListing.lat, selectedListing.lng], 15, {
        duration: 1
      })
    }
  }, [selectedListing, map])

  return null
}

export function MapView() {
  const { selectedListing, setLayoutState, listings } = useData()
  const { mode } = useTheme()
  const [mapLoaded, setMapLoaded] = useState(false)

  const cyberColor = mode === 'green' ? '#00FF00' : '#FF9500'

  // Custom tile layer for cyberpunk dark theme
  const cyberpunkTileLayer = (
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      className="cyber-tiles"
    />
  )

  // Alternative dark tile options (uncomment to try different styles)
  // const darkTileLayer = (
  //   <TileLayer
  //     attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
  //     url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
  //   />
  // )

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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          <button
            className="p-2 border border-current hover:bg-current hover:text-cyber-bg transition-all"
            aria-label="Toggle Layers"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={[37.7749, -122.4194]} // San Francisco
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          className="cyber-map"
        >
          {cyberpunkTileLayer}
          
          {/* Property Markers */}
          {listings.map((listing) => (
            <Marker
              key={listing.id}
              position={[listing.lat, listing.lng]}
              icon={createCyberMarker(cyberColor)}
            >
              <Popup className="cyber-popup">
                <div className="cyber-popup-content">
                  <div className="font-bold text-sm glow-text">
                    ${listing.price.toLocaleString()}
                  </div>
                  <div className="text-xs opacity-80">
                    {listing.beds}bd {listing.baths}ba
                  </div>
                  <div className="text-xs">
                    {listing.sqft.toLocaleString()} sqft
                  </div>
                  <div className="text-xs mt-1">
                    {listing.address.split(',')[0]}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          <MapUpdater />
        </MapContainer>

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
            aria-label="Reset View"
            onClick={() => {
              // This would reset the map view
              console.log('Reset view clicked')
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Info Panel */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-cyber-panel border border-current p-2 text-xs">
            <div className="opacity-80">FREE MAP TILES</div>
            <div>OpenStreetMap + Leaflet</div>
          </div>
        </div>

      </div>

      <style jsx>{`
        :global(.cyber-map) {
          filter: hue-rotate(${mode === 'green' ? '120deg' : '30deg'}) saturate(1.2) contrast(1.1);
        }
        
        :global(.cyber-popup .leaflet-popup-content-wrapper) {
          background: #111111 !important;
          border: 1px solid ${cyberColor} !important;
          color: ${cyberColor} !important;
          font-family: 'Orbitron', 'Courier New', monospace !important;
          border-radius: 0 !important;
        }
        
        :global(.cyber-popup .leaflet-popup-tip) {
          background: #111111 !important;
          border: 1px solid ${cyberColor} !important;
        }
        
        :global(.cyber-marker) {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 10px ${cyberColor}; }
          50% { box-shadow: 0 0 20px ${cyberColor}; }
          100% { box-shadow: 0 0 10px ${cyberColor}; }
        }
      `}</style>

    </div>
  )
}