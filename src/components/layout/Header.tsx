import React from 'react'
import { Search, Filter, Settings } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useData } from '../../context/DataContext'

export function Header() {
  const { mode, toggleMode } = useTheme()
  const { listings } = useData()

  return (
    <div className="w-full h-full bg-cyber-panel border border-current flex items-center justify-between px-6 cyber-glow">

      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold glow-text pixel-corners p-2">
          ◢ CYBERSTATE ◣
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-lg mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
          <input
            type="text"
            placeholder="> ENTER LOCATION | ZIP | ADDRESS"
            className="w-full bg-cyber-bg border border-current px-10 py-2 text-sm font-mono focus:outline-none focus:border-current cyber-glow terminal-cursor"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto">
        <div className="flex space-x-1">
          <button className="px-3 py-1 text-xs border border-current hover:bg-current hover:text-cyber-bg transition-all">
            PRICE ▼
          </button>
          <button className="px-3 py-1 text-xs border border-current hover:bg-current hover:text-cyber-bg transition-all">
            BEDS ▼
          </button>
          <button className="px-3 py-1 text-xs border border-current hover:bg-current hover:text-cyber-bg transition-all">
            TYPE ▼
          </button>
        </div>
      </div>

      {/* System Status */}
      <div className="flex items-center space-x-6 text-xs">
        <div className="flex flex-col items-center">
          <div className="glow-text">LISTINGS_LOADED</div>
          <div className="text-lg font-bold">{listings.length}</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="glow-text">LAST_SYNC</div>
          <div className="text-sm font-mono">14:32:15</div>
        </div>

        <button
          onClick={toggleMode}
          className="px-4 py-2 border border-current hover:bg-current hover:text-cyber-bg transition-all"
        >
          {mode.toUpperCase()} MODE
        </button>
      </div>

    </div>
  )
}
