import React from 'react'
import { Header } from './Header'
import { SidebarLeft } from './SidebarLeft'
import { MainContent } from './MainContent'
import { SidebarRight } from './SidebarRight'

export function DashboardLayout() {
  return (
    <div className="w-screen h-screen bg-cyber-bg overflow-hidden pixel-corners">
      {/* Fixed 1920x1080 viewport */}
      <div className="w-[1920px] h-[1080px] mx-auto relative grid grid-cols-24 gap-4 p-5">

        {/* Header - spans full width, 80px height */}
        <div className="col-span-24 h-[80px] pixel-corners">
          <Header />
        </div>

        {/* Left Sidebar - 320px width, full height minus header */}
        <div className="col-span-4 h-[calc(100%-80px-2rem)] pixel-corners">
          <SidebarLeft />
        </div>

        {/* Main Content - fluid width between sidebars */}
        <div className="col-span-16 h-[calc(100%-80px-2rem)] pixel-corners">
          <MainContent />
        </div>

        {/* Right Sidebar - 320px width, full height minus header */}
        <div className="col-span-4 h-[calc(100%-80px-2rem)] pixel-corners">
          <SidebarRight />
        </div>

      </div>
    </div>
  )
}
