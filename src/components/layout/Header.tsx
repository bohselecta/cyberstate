import { useState } from 'react'
import { Search } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useData } from '../../context/DataContext'

export function Header() {
  const { mode, toggleMode } = useTheme()
  const { listings, setFilteredListings } = useData()
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')
  const [bedsFilter, setBedsFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  // Search and filter functionality
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterListings(term, priceFilter, bedsFilter, typeFilter)
  }

  const filterListings = (search: string, price: string, beds: string, type: string) => {
    let filtered = listings.filter(listing => {
      // Search filter
      const matchesSearch = !search || 
        listing.address.toLowerCase().includes(search.toLowerCase()) ||
        listing.city.toLowerCase().includes(search.toLowerCase()) ||
        listing.zipCode.includes(search)

      // Price filter
      const matchesPrice = price === 'all' || 
        (price === 'under-500k' && listing.price < 500000) ||
        (price === '500k-1m' && listing.price >= 500000 && listing.price < 1000000) ||
        (price === '1m-2m' && listing.price >= 1000000 && listing.price < 2000000) ||
        (price === 'over-2m' && listing.price >= 2000000)

      // Beds filter
      const matchesBeds = beds === 'all' || 
        (beds === '1-2' && listing.beds >= 1 && listing.beds <= 2) ||
        (beds === '3-4' && listing.beds >= 3 && listing.beds <= 4) ||
        (beds === '5+' && listing.beds >= 5)

      // Type filter
      const matchesType = type === 'all' || listing.propertyType.toLowerCase() === type.toLowerCase()

      return matchesSearch && matchesPrice && matchesBeds && matchesType
    })

    setFilteredListings(filtered)
  }

  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case 'price':
        setPriceFilter(value)
        filterListings(searchTerm, value, bedsFilter, typeFilter)
        break
      case 'beds':
        setBedsFilter(value)
        filterListings(searchTerm, priceFilter, value, typeFilter)
        break
      case 'type':
        setTypeFilter(value)
        filterListings(searchTerm, priceFilter, bedsFilter, value)
        break
    }
  }

  return (
    <div className="w-full h-full bg-cyber-panel border border-current flex items-center justify-between px-4 lg:px-6 cyber-glow">

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
        <div className="relative">
          <Search className="absolute left-2 lg:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 lg:w-4 lg:h-4" />
          <input
            type="text"
            placeholder="> LOCATION | ZIP | ADDRESS"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-cyber-bg border border-current px-8 lg:px-10 py-1 lg:py-2 text-xs lg:text-sm font-mono focus:outline-none focus:border-current cyber-glow terminal-cursor"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto">
        <div className="flex space-x-1">
          <div className="relative group">
            <button className="px-3 py-1 text-xs border border-current hover:bg-current hover:text-cyber-bg transition-all flex items-center">
              PRICE ▼
            </button>
            <div className="absolute top-full right-0 mt-1 bg-cyber-panel border border-current opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <div className="py-1 min-w-32">
                <button onClick={() => handleFilterChange('price', 'all')} className="block w-full text-left px-3 py-1 text-xs hover:bg-current hover:text-cyber-bg">ALL</button>
                <button onClick={() => handleFilterChange('price', 'under-500k')} className="block w-full text-left px-3 py-1 text-xs hover:bg-current hover:text-cyber-bg">UNDER $500K</button>
                <button onClick={() => handleFilterChange('price', '500k-1m')} className="block w-full text-left px-3 py-1 text-xs hover:bg-current hover:text-cyber-bg">$500K - $1M</button>
                <button onClick={() => handleFilterChange('price', '1m-2m')} className="block w-full text-left px-3 py-1 text-xs hover:bg-current hover:text-cyber-bg">$1M - $2M</button>
                <button onClick={() => handleFilterChange('price', 'over-2m')} className="block w-full text-left px-3 py-1 text-xs hover:bg-current hover:text-cyber-bg">OVER $2M</button>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="px-3 py-1 text-xs border border-current hover:bg-current hover:text-cyber-bg transition-all flex items-center">
              BEDS ▼
            </button>
            <div className="absolute top-full right-0 mt-1 bg-cyber-panel border border-current opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <div className="py-1 min-w-24">
                <button onClick={() => handleFilterChange('beds', 'all')} className="block w-full text-left px-3 py-1 text-xs hover:bg-current hover:text-cyber-bg">ALL</button>
                <button onClick={() => handleFilterChange('beds', '1-2')} className="block w-full text-left px-3 py-1 text-xs hover:bg-current hover:text-cyber-bg">1-2 BEDS</button>
                <button onClick={() => handleFilterChange('beds', '3-4')} className="block w-full text-left px-3 py-1 text-xs hover:bg-current hover:text-cyber-bg">3-4 BEDS</button>
                <button onClick={() => handleFilterChange('beds', '5+')} className="block w-full text-left px-3 py-1 text-xs hover:bg-current hover:text-cyber-bg">5+ BEDS</button>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="px-3 py-1 text-xs border border-current hover:bg-current hover:text-cyber-bg transition-all flex items-center">
              TYPE ▼
            </button>
            <div className="absolute top-full right-0 mt-1 bg-cyber-panel border border-current opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <div className="py-1 min-w-32">
                <button onClick={() => handleFilterChange('type', 'all')} className="block w-full text-left px-3 py-1 text-xs hover:bg-current hover:text-cyber-bg">ALL</button>
                <button onClick={() => handleFilterChange('type', 'house')} className="block w-full text-left px-3 py-1 text-xs hover:bg-current hover:text-cyber-bg">HOUSE</button>
                <button onClick={() => handleFilterChange('type', 'condo')} className="block w-full text-left px-3 py-1 text-xs hover:bg-current hover:text-cyber-bg">CONDO</button>
                <button onClick={() => handleFilterChange('type', 'townhouse')} className="block w-full text-left px-3 py-1 text-xs hover:bg-current hover:text-cyber-bg">TOWNHOUSE</button>
              </div>
            </div>
          </div>
          
          <button
            onClick={toggleMode}
            className="px-3 py-1 text-xs border border-current hover:bg-current hover:text-cyber-bg transition-all"
          >
            {mode.toUpperCase()} MODE
          </button>
        </div>
      </div>

    </div>
  )
}

