import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Image as ImageIcon, Heart, Maximize } from 'lucide-react'

interface PhotoCarouselProps {
  photos: string[]
}

export function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  if (!photos || photos.length === 0) {
    return (
      <div className="w-full h-full bg-cyber-bg flex items-center justify-center">
        <div className="text-center text-sm opacity-70">
          <ImageIcon className="w-8 h-8 mx-auto mb-2" />
          No photos available
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative bg-cyber-bg">

      {/* Main Image */}
      <div className="w-full h-full relative">
        <img
          src={photos[currentIndex]}
          alt={`Property photo ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Overlay Controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={prevPhoto}
            className="w-10 h-10 bg-cyber-panel border border-current flex items-center justify-center hover:bg-current hover:text-cyber-bg transition-all opacity-80 hover:opacity-100"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="w-10 h-10 bg-cyber-panel border border-current flex items-center justify-center hover:bg-current hover:text-cyber-bg transition-all opacity-80 hover:opacity-100"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Top Right Controls */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            className="w-8 h-8 bg-cyber-panel border border-current flex items-center justify-center hover:bg-current hover:text-cyber-bg transition-all opacity-80 hover:opacity-100"
            aria-label="Favorite property"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            className="w-8 h-8 bg-cyber-panel border border-current flex items-center justify-center hover:bg-current hover:text-cyber-bg transition-all opacity-80 hover:opacity-100"
            aria-label="Fullscreen view"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">

          {/* Photo Counter */}
          <div className="bg-cyber-panel border border-current px-3 py-1 text-xs font-mono">
            {currentIndex + 1} / {photos.length}
          </div>

          {/* Thumbnail Strip */}
          <div className="flex space-x-1">
            {photos.slice(0, 5).map((photo, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-12 h-12 border transition-all ${
                  index === currentIndex
                    ? 'border-current cyber-glow'
                    : 'border-current opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={photo}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

        </div>

      </div>

    </div>
  )
}
