import { useEffect, useState } from 'react';

export const useDevice = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth <= 768);
    });

    return () => window.removeEventListener('resize', () => {});
  }, []);

  return {
    isMobile,
  };
};
