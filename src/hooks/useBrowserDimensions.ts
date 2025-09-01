import { useEffect } from 'react';

export const useBrowserDimensions = () => {
  useEffect(() => {
    const handleResize = () => {
      // Handle resize events silently for production
      // Debug logging can be enabled via environment variable if needed
      if (process.env.NODE_ENV === 'development') {
        const width = window.innerWidth;
        const height = window.innerHeight;
        console.log(`Viewport resized to: ${width}x${height}px`);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};
