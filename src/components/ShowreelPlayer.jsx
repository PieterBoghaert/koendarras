import { useState, useEffect } from 'react';

const ShowreelPlayer = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Video IDs for different screen sizes
  const desktopVideoId = '1120469511'; // 16:9 ratio
  const mobileVideoId = '1120949925';  // 9:16 ratio
  
  const currentVideoId = isMobile ? mobileVideoId : desktopVideoId;
  const thumbnailSrc = isMobile ? '/koen-mobile-thumbnail.png' : '/koen-desktop-thumbnail.png';

  return (
    <div className={`relative w-full ${className}`}>
      {!isPlaying ? (
        // Thumbnail with play button overlay
        <div 
          className="relative cursor-pointer group"
          onClick={handlePlay}
        >
          {/* Responsive container */}
          <div className={`relative w-full overflow-hidden rounded-lg ${
            isMobile ? 'aspect-[9/16] max-w-sm mx-auto' : 'aspect-video'
          }`}>
            <img
              src={thumbnailSrc}
              alt="Koen Darras Showreel Thumbnail"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-90 rounded-full p-4 md:p-6 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-100">
                <svg 
                  className="w-8 h-8 md:w-12 md:h-12 text-gray-800 ml-1" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            
            {/* Play text overlay */}
            <div className="absolute bottom-4 left-4 text-white text-sm md:text-base font-medium opacity-80">
              Play Showreel
            </div>
          </div>
        </div>
      ) : (
        // Vimeo iframe (lazy loaded)
        <div className={`relative w-full overflow-hidden rounded-lg ${
          isMobile ? 'aspect-[9/16] max-w-sm mx-auto' : 'aspect-video'
        }`}>
          <iframe
            src={`https://player.vimeo.com/video/${currentVideoId}?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0&background=1`}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Koen Darras Showreel"
          />
        </div>
      )}
      
      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          Current mode: {isMobile ? 'Mobile (9:16)' : 'Desktop (16:9)'} | 
          Video ID: {currentVideoId} | 
          Screen width: {typeof window !== 'undefined' ? window.innerWidth : 'SSR'}px
        </div>
      )}
    </div>
  );
};

export default ShowreelPlayer;
