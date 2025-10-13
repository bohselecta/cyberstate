import { Search } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export function Header() {
  const { mode, toggleMode } = useTheme()

  return (
    <div className="w-full h-full bg-cyber-panel border border-current flex items-center justify-between px-4 lg:px-6 cyber-glow">

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
        <div className="relative">
          <Search className="absolute left-2 lg:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 lg:w-4 lg:h-4" />
          <input
            type="text"
            placeholder="> LOCATION | ZIP | ADDRESS"
            className="w-full bg-cyber-bg border border-current px-8 lg:px-10 py-1 lg:py-2 text-xs lg:text-sm font-mono focus:outline-none focus:border-current cyber-glow terminal-cursor"
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

