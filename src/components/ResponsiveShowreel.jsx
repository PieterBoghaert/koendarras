import React, { useState, useEffect } from 'react';

const ResponsiveShowreel = ({ 
  desktopVideoId = "1120949925", // Default desktop video ID
  mobileVideoId = "1120949925",  // Mobile video ID (9:16 ratio)
  className = ""
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Detect screen size and update mobile state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Get the appropriate video ID based on screen size
  const currentVideoId = isMobile ? mobileVideoId : desktopVideoId;

  // Handle play button click
  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Video Container with responsive aspect ratios */}
      <div className={`
        relative w-full overflow-hidden rounded-lg bg-black
        ${isMobile ? 'aspect-[9/16]' : 'aspect-video'}
      `}>
        {!isPlaying ? (
          // Thumbnail with play button overlay
          <div className="relative w-full h-full group cursor-pointer" onClick={handlePlay}>
            {/* Vimeo thumbnail - using Vimeo's thumbnail API */}
            <img
              src={`https://vumbnail.com/${currentVideoId}.jpg`}
              alt="Showreel thumbnail"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300">
              <div className="
                w-16 h-16 md:w-20 md:h-20 
                bg-white bg-opacity-90 
                rounded-full 
                flex items-center justify-center 
                group-hover:bg-opacity-100 
                group-hover:scale-110 
                transition-all duration-300 
                shadow-lg
              ">
                <svg 
                  className="w-6 h-6 md:w-8 md:h-8 text-black ml-1" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>

            {/* Play text (optional) */}
            <div className="absolute bottom-4 left-4 text-white text-sm md:text-base font-medium opacity-90">
              Play Showreel
            </div>
          </div>
        ) : (
          // Vimeo iframe when playing
          <iframe
            src={`https://player.vimeo.com/video/${currentVideoId}?autoplay=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Koen Darras Showreel"
          />
        )}
      </div>

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-2 text-xs text-gray-500">
          Current mode: {isMobile ? 'Mobile (9:16)' : 'Desktop (16:9)'} | 
          Video ID: {currentVideoId} | 
          Screen width: {typeof window !== 'undefined' ? window.innerWidth : 'SSR'}px
        </div>
      )}
    </div>
  );
};

export default ResponsiveShowreel;
