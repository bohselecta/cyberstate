import React from 'react'
import { useData } from '../../context/DataContext'
import { ListingCard } from '../ui/ListingCard'

export function SidebarLeft() {
  const { listings, selectedListing, setSelectedListing } = useData()

  return (
    <div className="w-full h-full bg-cyber-panel border border-current flex flex-col cyber-glow">

      {/* Header */}
      <div className="p-4 border-b border-current">
        <h3 className="text-sm font-bold glow-text">◢ LISTING QUEUE ◣</h3>
        <div className="text-xs opacity-70 mt-1">
          {listings.length} PROPERTIES LOADED
        </div>
      </div>

      {/* Scrollable Listing Cards */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-2">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              isSelected={selectedListing?.id === listing.id}
              onClick={() => setSelectedListing(listing)}
            />
          ))}
        </div>
      </div>

      {/* Filter Panel */}
      <div className="p-4 border-t border-current">
        <h4 className="text-xs font-bold mb-2">QUICK FILTERS</h4>
        <div className="space-y-1">
          <button className="w-full text-left text-xs p-2 border border-current hover:bg-current hover:text-cyber-bg transition-all">
            PRICE: LOW TO HIGH
          </button>
          <button className="w-full text-left text-xs p-2 border border-current hover:bg-current hover:text-cyber-bg transition-all">
            NEWEST LISTINGS
          </button>
          <button className="w-full text-left text-xs p-2 border border-current hover:bg-current hover:text-cyber-bg transition-all">
            MOST POPULAR
          </button>
        </div>
      </div>

    </div>
  )
}
