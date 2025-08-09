import React, { useEffect, useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

function ScrollToTop(): React.JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const toggleVisibility = (): void => {
      // Show button when user scrolls down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full backdrop-blur-md border transition-all duration-300 ease-out group shadow-lg ${
        isDarkMode 
          ? 'bg-white/10 border-white/20 hover:bg-white/20' 
          : 'bg-black/10 border-black/20 hover:bg-black/20'
      } hover:scale-110 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Scroll to top"
      style={{
        fontFamily: '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}
    >
      <FaChevronUp className={`w-5 h-5 group-hover:text-blue-400 transition-colors duration-300 mx-auto ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`} />
    </button>
  );
}

export default ScrollToTop;
