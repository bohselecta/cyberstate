import { useData } from '../../context/DataContext'
import { MapView } from '../map/MapView'
import { PropertyViewer } from '../property/PropertyViewer'
import clsx from 'clsx'

export function MainContent() {
  const { layoutState } = useData()

  return (
    <div className="w-full h-full flex bg-cyber-panel border border-current cyber-glow">

      {/* Map View */}
      <div
        className={clsx(
          'h-full border-r border-current transition-all duration-500 ease-in-out',
          layoutState === 'map-expanded' ? 'w-full' : layoutState === 'photo-expanded' ? 'w-[30%]' : 'w-[60%]'
        )}
      >
        <MapView />
      </div>

      {/* Property Viewer */}
      <div
        className={clsx(
          'h-full transition-all duration-500 ease-in-out',
          layoutState === 'map-expanded' ? 'w-0 overflow-hidden' : layoutState === 'photo-expanded' ? 'w-[70%]' : 'w-[40%]'
        )}
      >
        <PropertyViewer />
      </div>

    </div>
  )
}
