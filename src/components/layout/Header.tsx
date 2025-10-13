import { Search } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useData } from '../../context/DataContext'

export function Header() {
  const { mode, toggleMode } = useTheme()
  const { listings } = useData()

  return (
    <div className="w-full h-full bg-cyber-panel border border-current flex flex-col lg:flex-row items-center justify-between px-2 lg:px-6 py-2 lg:py-0 cyber-glow">

      {/* Logo Section */}
      <div className="flex items-center space-x-2 lg:space-x-4 mb-2 lg:mb-0">
        <div className="text-lg lg:text-2xl font-bold glow-text pixel-corners p-1 lg:p-2">
          ◢ CYBERSTATE ◣
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md lg:max-w-lg mx-2 lg:mx-8 mb-2 lg:mb-0">
        <div className="relative">
          <Search className="absolute left-2 lg:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 lg:w-4 lg:h-4" />
          <input
            type="text"
            placeholder="> LOCATION | ZIP | ADDRESS"
            className="w-full bg-cyber-bg border border-current px-8 lg:px-10 py-1 lg:py-2 text-xs lg:text-sm font-mono focus:outline-none focus:border-current cyber-glow terminal-cursor"
          />
        </div>
      </div>

      {/* Filter Chips - Hidden on small screens */}
      <div className="hidden lg:flex items-center space-x-2 overflow-x-auto">
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
      <div className="flex items-center space-x-2 lg:space-x-6 text-xs">
        <div className="flex flex-col items-center">
          <div className="glow-text text-xs">LISTINGS</div>
          <div className="text-sm lg:text-lg font-bold">{listings.length}</div>
        </div>

        <div className="hidden lg:flex flex-col items-center">
          <div className="glow-text">LAST_SYNC</div>
          <div className="text-sm font-mono">14:32:15</div>
        </div>

        <button
          onClick={toggleMode}
          className="px-2 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm border border-current hover:bg-current hover:text-cyber-bg transition-all"
        >
          {mode.toUpperCase()}
        </button>
      </div>

    </div>
  )
}
