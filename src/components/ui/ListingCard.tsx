import { Listing } from '../../context/DataContext'
import clsx from 'clsx'

interface ListingCardProps {
  listing: Listing
  isSelected: boolean
  onClick: () => void
}

export function ListingCard({ listing, isSelected, onClick }: ListingCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div
      onClick={onClick}
      className={clsx(
        'w-full h-32 bg-cyber-bg border cursor-pointer transition-all duration-300 flex relative group',
        isSelected
          ? 'border-current bg-current text-cyber-bg cyber-glow transform scale-[1.02]'
          : 'border-current hover:border-current hover:bg-current hover:text-cyber-bg hover:transform hover:scale-[1.01] hover:shadow-lg'
      )}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-current cyber-glow"></div>
      )}

      {/* Thumbnail */}
      <div className="w-32 h-full flex-shrink-0 relative overflow-hidden">
        <img
          src={listing.photos[0]}
          alt={listing.address}
          className={clsx(
            'w-full h-full object-cover transition-transform duration-300',
            isSelected ? 'scale-105' : 'group-hover:scale-105'
          )}
        />
        {/* Price Badge */}
        <div className={clsx(
          'absolute top-1 left-1 px-1 py-0.5 text-xs font-bold border transition-all duration-300',
          isSelected 
            ? 'bg-cyber-bg text-current border-current' 
            : 'bg-cyber-panel border-current group-hover:bg-current group-hover:text-cyber-bg'
        )}>
          {formatPrice(listing.price)}
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
      </div>

      {/* Info Grid */}
      <div className="flex-1 p-2 text-xs font-mono leading-tight">
        <div className="grid grid-cols-1 gap-1 h-full">

          {/* Price and Key Stats */}
          <div className="font-bold">
            {formatPrice(listing.price)} | {listing.beds}bd {listing.baths}ba
          </div>

          {/* Sqft and Price per sqft */}
          <div className="opacity-80">
            {listing.sqft.toLocaleString()} sqft | ${listing.pricePerSqft}/sqft
          </div>

          {/* Address */}
          <div className="opacity-80 truncate">
            {listing.address.split(',')[0]}
          </div>

          {/* Days on market and status */}
          <div className={clsx(
            'font-bold transition-all duration-300',
            isSelected ? 'text-cyber-bg' : 'glow-text group-hover:text-current'
          )}>
            {listing.daysOnMarket} days | {listing.status}
          </div>
          
          {/* Quick Action Indicator */}
          <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 bg-current rounded-full"></div>
          </div>

        </div>
      </div>

    </div>
  )
}
