import { Header } from './Header'
import { SidebarLeft } from './SidebarLeft'
import { MainContent } from './MainContent'
import { SidebarRight } from './SidebarRight'

export function DashboardLayout() {
  return (
    <div className="w-screen h-screen bg-cyber-bg overflow-hidden pixel-corners">
      {/* Responsive layout - adapts to screen size */}
      <div className="w-full h-full max-w-[1920px] mx-auto relative grid grid-cols-24 gap-2 lg:gap-4 p-2 lg:p-5">

        {/* Header - spans full width, 60px on mobile, 80px on desktop */}
        <div className="col-span-24 h-[60px] lg:h-[80px] pixel-corners">
          <Header />
        </div>

        {/* Left Sidebar - responsive width */}
        <div className="col-span-6 lg:col-span-4 h-[calc(100%-60px-1rem)] lg:h-[calc(100%-80px-2rem)] pixel-corners">
          <SidebarLeft />
        </div>

        {/* Main Content - fluid width between sidebars */}
        <div className="col-span-12 lg:col-span-16 h-[calc(100%-60px-1rem)] lg:h-[calc(100%-80px-2rem)] pixel-corners">
          <MainContent />
        </div>

        {/* Right Sidebar - responsive width */}
        <div className="col-span-6 lg:col-span-4 h-[calc(100%-60px-1rem)] lg:h-[calc(100%-80px-2rem)] pixel-corners">
          <SidebarRight />
        </div>

      </div>
    </div>
  )
}
