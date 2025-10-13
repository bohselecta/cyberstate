import { useTheme } from '../../context/ThemeContext'

export function LogoModule() {
  const { mode } = useTheme()

  return (
    <div className="w-full bg-cyber-panel border border-current pixel-corners cyber-glow mb-2">
      <div className="p-3 text-center">
        <div className="text-lg lg:text-xl font-bold glow-text pixel-corners p-2 mb-2">
          ◢ CYBERSTATE ◣
        </div>
        <div className="text-xs opacity-80 font-mono">
          MLS DASHBOARD SYSTEM
        </div>
        <div className="text-xs opacity-60 font-mono mt-1">
          {mode.toUpperCase()} MODE ACTIVE
        </div>
      </div>
    </div>
  )
}
