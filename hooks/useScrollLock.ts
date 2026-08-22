import { useEffect } from 'react';
import { useLenis } from 'lenis/react';

export function useScrollLock(isOpen: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [isOpen, lenis]);

  // Return attributes to spread on the scrollable container inside the locked area
  return {
    'data-lenis-prevent': true
  };
}
