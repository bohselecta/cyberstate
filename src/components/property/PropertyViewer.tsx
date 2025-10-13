import { useState } from 'react'
import { Heart, Share, Calendar, Maximize } from 'lucide-react'
import { useData } from '../../context/DataContext'
import { PhotoCarousel } from './PhotoCarousel'
import { PropertyDetails } from './PropertyDetails'

export function PropertyViewer() {
  const { selectedListing, setLayoutState } = useData()
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'comps'>('overview')

  if (!selectedListing) {
    return (
      <div className="w-full h-full bg-cyber-panel border-l border-current flex items-center justify-center">
        <div className="text-center text-sm opacity-70">
          <div className="mb-4">◢ NO PROPERTY SELECTED ◣</div>
          <div>Click a listing from the left sidebar to view details</div>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="w-full h-full bg-cyber-panel border-l border-current flex flex-col">

      {/* Header */}
      <div className="p-4 border-b border-current">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold glow-text">◢ PROPERTY VIEWER ◣</h3>
          <button
            onClick={() => setLayoutState('photo-expanded')}
            className="p-2 border border-current hover:bg-current hover:text-cyber-bg transition-all"
            title="Expand Property Viewer"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>

        {/* Property Header */}
        <div className="space-y-2">
          <div className="text-2xl font-bold glow-text">{formatPrice(selectedListing.price)}</div>
          <div className="text-sm">{selectedListing.address}</div>

          {/* Quick Stats */}
          <div className="flex items-center space-x-4 text-sm">
            <span><strong>{selectedListing.beds}</strong> beds</span>
            <span><strong>{selectedListing.baths}</strong> baths</span>
            <span><strong>{selectedListing.sqft.toLocaleString()}</strong> sqft</span>
            <span><strong>{selectedListing.yearBuilt}</strong> built</span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 mt-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-current text-cyber-bg hover:bg-cyber-panel hover:text-current border border-current transition-all">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-bold">SCHEDULE TOUR</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-current hover:bg-current hover:text-cyber-bg transition-all">
              <Heart className="w-4 h-4" />
              <span className="text-xs">SAVE</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-current hover:bg-current hover:text-cyber-bg transition-all">
              <Share className="w-4 h-4" />
              <span className="text-xs">SHARE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Photo Carousel - 65% height */}
      <div className="h-[65%] border-b border-current">
        <PhotoCarousel photos={selectedListing.photos} />
      </div>

      {/* Property Tabs - Remaining height */}
      <div className="flex-1 flex flex-col">

        {/* Tab Navigation */}
        <div className="flex border-b border-current">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-current text-cyber-bg'
                : 'hover:bg-current hover:text-cyber-bg'
            }`}
          >
            OVERVIEW
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 text-xs font-bold transition-all ${
              activeTab === 'history'
                ? 'bg-current text-cyber-bg'
                : 'hover:bg-current hover:text-cyber-bg'
            }`}
          >
            PRICE HISTORY
          </button>
          <button
            onClick={() => setActiveTab('comps')}
            className={`flex-1 py-2 text-xs font-bold transition-all ${
              activeTab === 'comps'
                ? 'bg-current text-cyber-bg'
                : 'hover:bg-current hover:text-cyber-bg'
            }`}
          >
            COMPS
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <PropertyDetails listing={selectedListing} activeTab={activeTab} />
        </div>

      </div>

    </div>
  )
}
