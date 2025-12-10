// Mobile carousel touch gesture functionality
export const useTouchGestures = (currentIndex, setCurrentIndex, maxIndex) => {
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    isDragging = false;

    const diffX = startX - currentX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentIndex < maxIndex) {
        // Swipe left - next slide
        setCurrentIndex(currentIndex + 1);
      } else if (diffX < 0 && currentIndex > 0) {
        // Swipe right - previous slide
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
};
