import { useEffect, useState } from 'react';

export const useDevice = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth <= 768);
      setWidth(window.innerWidth);
    });

    return () => window.removeEventListener('resize', () => {});
  }, []);

  return {
    isMobile,
    width,
  };
};
