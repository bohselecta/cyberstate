import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './mapbox-styles.css'
import { useData } from '../../context/DataContext'
import { useTheme } from '../../context/ThemeContext'

// You'll need to get a free Mapbox token from https://mapbox.com
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example'

export function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const { selectedListing, setLayoutState, listings } = useData()
  const { mode } = useTheme()

  useEffect(() => {
    if (map.current) return // Initialize map only once

    if (!mapContainer.current) return

    // Set Mapbox access token
    mapboxgl.accessToken = MAPBOX_TOKEN

    // Create map with cyberpunk dark style
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Dark theme
      center: [-122.4194, 37.7749], // San Francisco
      zoom: 12,
      attributionControl: false, // Hide attribution for cleaner look
    })

    // Add custom cyberpunk styling
    map.current.on('load', () => {
      setMapLoaded(true)
      
      // Add custom layer for cyberpunk effect
      if (map.current) {
        map.current.addSource('cyberpunk-overlay', {
          type: 'raster',
          tiles: ['data:image/svg+xml;base64,' + btoa(`
            <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="${mode === 'green' ? '#00FF00' : '#FF9500'}" stroke-width="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="256" height="256" fill="url(#grid)"/>
            </svg>
          `)],
          tileSize: 256
        })

        map.current.addLayer({
          id: 'cyberpunk-grid',
          type: 'raster',
          source: 'cyberpunk-overlay',
          paint: {
            'raster-opacity': 0.2
          }
        })
      }
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Add custom markers for listings
    listings.forEach((listing) => {
      if (map.current) {
        const marker = new mapboxgl.Marker({
          color: mode === 'green' ? '#00FF00' : '#FF9500',
          scale: selectedListing?.id === listing.id ? 1.2 : 0.8
        })
          .setLngLat([listing.lng, listing.lat])
          .addTo(map.current)

        // Add click handler
        marker.getElement().addEventListener('click', () => {
          // This would trigger listing selection
          console.log('Marker clicked:', listing.address)
        })

        // Add popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          className: 'cyber-popup'
        }).setHTML(`
          <div class="cyber-popup-content">
            <div class="font-bold text-sm">$${listing.price.toLocaleString()}</div>
            <div class="text-xs opacity-80">${listing.beds}bd ${listing.baths}ba</div>
            <div class="text-xs">${listing.sqft.toLocaleString()} sqft</div>
          </div>
        `)

        marker.setPopup(popup)
      }
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [listings, selectedListing, mode])

  // Update map center when listing is selected
  useEffect(() => {
    if (map.current && selectedListing) {
      map.current.flyTo({
        center: [selectedListing.lng, selectedListing.lat],
        zoom: 15,
        duration: 1000
      })
    }
  }, [selectedListing])

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
        <div 
          ref={mapContainer} 
          className="w-full h-full"
          style={{ minHeight: '400px' }}
        />

        {/* Loading overlay */}
        {!mapLoaded && (
          <div className="absolute inset-0 bg-cyber-bg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-current border-t-transparent rounded-full mx-auto mb-2"></div>
              <div className="text-sm font-mono">LOADING MAP...</div>
            </div>
          </div>
        )}

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
            onClick={() => map.current?.zoomIn()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button
            className="w-8 h-8 bg-cyber-panel border border-current flex items-center justify-center hover:bg-current hover:text-cyber-bg transition-all"
            aria-label="Zoom Out"
            onClick={() => map.current?.zoomOut()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
            </svg>
          </button>
          <button
            className="w-8 h-8 bg-cyber-panel border border-current flex items-center justify-center hover:bg-current hover:text-cyber-bg transition-all"
            aria-label="Reset View"
            onClick={() => map.current?.flyTo({ center: [-122.4194, 37.7749], zoom: 12 })}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Grid Overlay Toggle */}
        <div className="absolute bottom-4 right-4">
          <button 
            className="px-3 py-1 text-xs border border-current hover:bg-current hover:text-cyber-bg transition-all"
            onClick={() => {
              if (map.current) {
                const visibility = map.current.getLayoutProperty('cyberpunk-grid', 'visibility')
                map.current.setLayoutProperty('cyberpunk-grid', 'visibility', visibility === 'visible' ? 'none' : 'visible')
              }
            }}
          >
            GRID OVERLAY
          </button>
        </div>

      </div>

      <style jsx>{`
        :global(.cyber-popup .mapboxgl-popup-content) {
          background: #111111 !important;
          border: 1px solid ${mode === 'green' ? '#00FF00' : '#FF9500'} !important;
          color: ${mode === 'green' ? '#00FF00' : '#FF9500'} !important;
          font-family: 'Orbitron', 'Courier New', monospace !important;
          padding: 8px !important;
          border-radius: 0 !important;
        }
        
        :global(.cyber-popup .mapboxgl-popup-tip) {
          border-top-color: ${mode === 'green' ? '#00FF00' : '#FF9500'} !important;
        }
      `}</style>

    </div>
  )
}