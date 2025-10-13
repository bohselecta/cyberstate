import { Listing } from '../../context/DataContext'

interface PropertyDetailsProps {
  listing: Listing
  activeTab: 'overview' | 'history' | 'comps'
}

export function PropertyDetails({ listing, activeTab }: PropertyDetailsProps) {

  if (activeTab === 'overview') {
    return (
      <div className="space-y-6">

        {/* Description */}
        <div>
          <h4 className="text-sm font-bold mb-2 glow-text">DESCRIPTION</h4>
          <p className="text-xs leading-relaxed">{listing.description}</p>
        </div>

        {/* Property Details Grid */}
        <div>
          <h4 className="text-sm font-bold mb-3 glow-text">PROPERTY DETAILS</h4>
          <div className="grid grid-cols-2 gap-4 text-xs">

            <div className="space-y-2">
              <div><strong>Type:</strong> {listing.propertyType}</div>
              <div><strong>Year Built:</strong> {listing.yearBuilt}</div>
              <div><strong>Lot Size:</strong> {listing.lotSize ? `${listing.lotSize.toLocaleString()} sqft` : 'N/A'}</div>
              <div><strong>Parking:</strong> {listing.parking || 'N/A'}</div>
            </div>

            <div className="space-y-2">
              <div><strong>HOA Fees:</strong> {listing.hoaFees ? `$${listing.hoaFees}/mo` : 'None'}</div>
              <div><strong>Property Tax:</strong> {listing.taxAmount ? `$${listing.taxAmount}/yr` : 'N/A'}</div>
              <div><strong>Heating/Cooling:</strong> {listing.heatingCooling || 'N/A'}</div>
              <div><strong>Appliances:</strong> {listing.appliances ? listing.appliances.join(', ') : 'N/A'}</div>
            </div>

          </div>
        </div>

      </div>
    )
  }

  if (activeTab === 'history') {
    return (
      <div className="space-y-4">

        <h4 className="text-sm font-bold glow-text">PRICE HISTORY</h4>

        {/* Placeholder for price history chart */}
        <div className="bg-cyber-bg border border-current p-4 h-64 flex items-center justify-center">
          <div className="text-center text-sm opacity-70">
            <div className="mb-2">📊 PRICE HISTORY CHART</div>
            <div className="text-xs">
              Interactive line chart showing price changes over time<br/>
              Using Recharts library
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-2">
          <div className="text-xs font-bold">RECENT ACTIVITY</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Listed</span>
              <span>{listing.daysOnMarket} days ago</span>
            </div>
            <div className="flex justify-between">
              <span>Price</span>
              <span>${listing.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Status</span>
              <span className="glow-text">{listing.status}</span>
            </div>
          </div>
        </div>

      </div>
    )
  }

  if (activeTab === 'comps') {
    return (
      <div className="space-y-4">

        <h4 className="text-sm font-bold glow-text">COMPARABLE SALES</h4>

        {/* Placeholder for comparable properties */}
        <div className="space-y-3">
          {[1, 2, 3].map((comp) => (
            <div key={comp} className="bg-cyber-bg border border-current p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-sm font-bold">Similar Property {comp}</div>
                  <div className="text-xs opacity-80">Nearby Address</div>
                </div>
                <div className="text-sm font-bold glow-text">
                  ${(listing.price + (Math.random() - 0.5) * 100000).toLocaleString()}
                </div>
              </div>

              <div className="flex justify-between text-xs">
                <span>3bd • 2ba • 1,800 sqft</span>
                <span className="opacity-80">Sold 3 months ago</span>
              </div>

              <div className="text-xs mt-1">
                <span className="opacity-80">${Math.round(listing.pricePerSqft! + (Math.random() - 0.5) * 50)}/sqft</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs opacity-70 text-center">
          Showing 3 of 12 comparable sales within 1 mile
        </div>

      </div>
    )
  }

  return null
}
