import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type ThemeMode = 'green' | 'amber'

interface ThemeContextType {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>('green')

  useEffect(() => {
    document.body.className = mode
  }, [mode])

  const toggleMode = () => {
    setMode(prev => prev === 'green' ? 'amber' : 'green')
  }

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
