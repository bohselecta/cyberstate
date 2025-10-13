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
        'w-full h-32 bg-cyber-bg border cursor-pointer transition-all duration-300 flex',
        isSelected
          ? 'border-current bg-current text-cyber-bg cyber-glow'
          : 'border-current hover:border-current hover:bg-current hover:text-cyber-bg'
      )}
    >

      {/* Thumbnail */}
      <div className="w-32 h-full flex-shrink-0">
        <img
          src={listing.photos[0]}
          alt={listing.address}
          className="w-full h-full object-cover"
        />
        {/* Price Badge */}
        <div className="absolute top-1 left-1 bg-cyber-panel border border-current px-1 py-0.5 text-xs font-bold">
          {formatPrice(listing.price)}
        </div>
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
            'font-bold',
            isSelected ? 'text-cyber-bg' : 'glow-text'
          )}>
            {listing.daysOnMarket} days | {listing.status}
          </div>

        </div>
      </div>

    </div>
  )
}
