import { DashboardLayout } from './components/layout/DashboardLayout'
import { ThemeProvider } from './context/ThemeContext'
import { DataProvider } from './context/DataContext'

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <div className="w-screen h-screen overflow-hidden">
          <DashboardLayout />
        </div>
      </DataProvider>
    </ThemeProvider>
  )
}

export default App
