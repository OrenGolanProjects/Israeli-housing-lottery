import { useEffect } from 'react';

export const useBrowserDimensions = () => {
  useEffect(() => {
    const logDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const devicePixelRatio = window.devicePixelRatio;
      
      console.log(`=== Browser Dimensions Debug ===`);
      console.log(`Viewport: ${width}x${height}px`);
      console.log(`Screen: ${screenWidth}x${screenHeight}px`);
      console.log(`Device Pixel Ratio: ${devicePixelRatio}`);
      console.log(`CSS Pixels: ${width}px x ${height}px`);
      
      // Material-UI breakpoint reference
      console.log(`Material-UI Breakpoints:`);
      console.log(`- xs: < 600px`);
      console.log(`- sm: 600px - 900px`);
      console.log(`- md: 900px - 1200px`);
      console.log(`- lg: 1200px - 1536px`);
      console.log(`- xl: >= 1536px`);
      console.log(`Current breakpoint: ${getCurrentBreakpoint(width)}`);
      console.log(`===============================`);
    };

    const getCurrentBreakpoint = (width: number): string => {
      if (width < 600) return 'xs';
      if (width < 900) return 'sm';
      if (width < 1200) return 'md';
      if (width < 1536) return 'lg';
      return 'xl';
    };

    logDimensions();
    window.addEventListener('resize', logDimensions);

    return () => {
      window.removeEventListener('resize', logDimensions);
    };
  }, []);
};
