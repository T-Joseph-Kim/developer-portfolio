import React, { useEffect, useState } from 'react';

function ScrollProgressBar(): React.JSX.Element {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const updateScrollProgress = (): void => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Set initial value

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 bg-transparent z-[100]">
      <div
        className="h-full bg-gradient-to-r from-white/60 via-white to-white/60 transition-all duration-150 ease-out shadow-lg"
        style={{
          width: `${scrollProgress}%`,
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
        }}
      />
    </div>
  );
}

export default ScrollProgressBar;
