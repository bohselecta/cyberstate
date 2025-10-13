import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Types based on the spec
export interface Property {
  id: string
  address: string
  price: number
  beds: number
  baths: number
  sqft: number
  lotSize?: number
  yearBuilt?: number
  propertyType: string
  status: string
  daysOnMarket: number
  photos: string[]
  description: string
  lat: number
  lng: number
  hoaFees?: number
  taxAmount?: number
  parking?: string
  heatingCooling?: string
  appliances?: string[]
  pricePerSqft?: number
}

export interface EnrichedData {
  neighborhoodStats?: any
  schoolRatings?: any
  crimeIndex?: any
  walkabilityScore?: number
  transitScore?: number
  nearbyAmenities?: any
  marketTrends?: any
  comparableSales?: any[]
}

export interface Listing extends Property {
  enriched?: EnrichedData
}

export type LayoutState = 'default' | 'map-expanded' | 'photo-expanded'

interface DataContextType {
  listings: Listing[]
  selectedListing: Listing | null
  layoutState: LayoutState
  filterCriteria: any
  mapBounds: any
  visibleListings: Listing[]
  setSelectedListing: (listing: Listing | null) => void
  setLayoutState: (state: LayoutState) => void
  setFilterCriteria: (criteria: any) => void
  setMapBounds: (bounds: any) => void
  updateVisibleListings: (listings: Listing[]) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

// Mock data for development
const mockListings: Listing[] = [
  {
    id: '1',
    address: '123 Main St, San Francisco, CA',
    price: 1250000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    yearBuilt: 1995,
    propertyType: 'HOUSE',
    status: 'ACTIVE',
    daysOnMarket: 15,
    photos: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop'
    ],
    description: 'Beautiful Victorian home in the heart of San Francisco with stunning views.',
    lat: 37.7749,
    lng: -122.4194,
    hoaFees: 0,
    taxAmount: 12000,
    parking: '2 car garage',
    heatingCooling: 'Central heat and air',
    appliances: ['Dishwasher', 'Refrigerator', 'Washer/Dryer'],
    pricePerSqft: 694,
    enriched: {
      walkabilityScore: 95,
      transitScore: 88,
      nearbyAmenities: {
        coffee: 3,
        grocery: 2,
        fitness: 5
      }
    }
  },
  {
    id: '2',
    address: '456 Oak Ave, Oakland, CA',
    price: 850000,
    beds: 2,
    baths: 2,
    sqft: 1200,
    yearBuilt: 2018,
    propertyType: 'CONDO',
    status: 'ACTIVE',
    daysOnMarket: 8,
    photos: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ],
    description: 'Modern condo with open floor plan and city views.',
    lat: 37.8044,
    lng: -122.2711,
    hoaFees: 450,
    taxAmount: 8500,
    parking: '1 covered space',
    heatingCooling: 'Heat pump',
    appliances: ['Dishwasher', 'Refrigerator'],
    pricePerSqft: 708,
    enriched: {
      walkabilityScore: 82,
      transitScore: 75,
      nearbyAmenities: {
        coffee: 4,
        grocery: 1,
        fitness: 3
      }
    }
  }
]

interface DataProviderProps {
  children: ReactNode
}

export function DataProvider({ children }: DataProviderProps) {
  const [listings, setListings] = useState<Listing[]>(mockListings)
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)
  const [layoutState, setLayoutState] = useState<LayoutState>('default')
  const [filterCriteria, setFilterCriteria] = useState({})
  const [mapBounds, setMapBounds] = useState({})
  const [visibleListings, setVisibleListings] = useState<Listing[]>(mockListings)

  const updateVisibleListings = (listings: Listing[]) => {
    setVisibleListings(listings)
  }

  return (
    <DataContext.Provider value={{
      listings,
      selectedListing,
      layoutState,
      filterCriteria,
      mapBounds,
      visibleListings,
      setSelectedListing,
      setLayoutState,
      setFilterCriteria,
      setMapBounds,
      updateVisibleListings
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
