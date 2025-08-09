import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon, FaLinkedin, FaGithub } from 'react-icons/fa';
import TJKLogoWhite from '../assets/TJK_WT.png';
import TJKLogoBlack from '../assets/TJK_BLK.png';
import { useTheme } from '../contexts/ThemeContext';

function Navbar(): React.JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string): void => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className="sticky top-0 z-50 transition-all duration-300 ease-out px-4"
      style={{
        paddingTop: scrolled ? '1.25rem' : '2.5rem',
        fontFamily: '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}
    >
      <div 
        className={`mx-auto transition-all duration-300 ease-out ${
          scrolled ? 'w-[90%]' : 'w-[60%]'
        }`}
      >
        <div className={`rounded-2xl transition-all duration-300 ${
          scrolled 
            ? `backdrop-blur-sm shadow-lg ${
                isDarkMode 
                  ? 'bg-white/10' 
                  : 'bg-black/10'
              }` 
            : 'bg-transparent'
        }`}>
          <div className={`flex items-center justify-between w-full transition-all duration-400 ${
            scrolled ? 'px-8 py-5' : 'px-6 py-4'
          }`}>
            {/* Left - Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className={`p-2 rounded-xl hover:scale-110 hover:translate-y-1 transition-all duration-400 group flex-shrink-0 ${
                isDarkMode 
                  ? 'hover:bg-white/10' 
                  : 'hover:bg-black/10'
              }`}
              aria-label="Home"
            >
              <img 
                src={isDarkMode ? TJKLogoWhite : TJKLogoBlack}
                alt="TJK Logo" 
                className="w-10 h-10 object-contain transition-all duration-300 group-hover:brightness-110"
              />
            </button>

            {/* Center - Navigation Links */}
            <div className={`flex items-center flex-1 justify-center transition-all duration-400 ${
              scrolled ? 'space-x-12' : 'space-x-8'
            }`}>
              <button
                onClick={() => scrollToSection('experience')}
                className={`px-4 py-2 rounded-xl hover:scale-105 hover:translate-y-1 transition-all duration-300 font-medium text-lg ${
                  isDarkMode 
                    ? 'text-white hover:bg-white/20' 
                    : 'text-gray-900 hover:bg-black/20'
                }`}
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className={`px-4 py-2 rounded-xl hover:scale-105 hover:translate-y-1 transition-all duration-300 font-medium text-lg ${
                  isDarkMode 
                    ? 'text-white hover:bg-white/20' 
                    : 'text-gray-900 hover:bg-black/20'
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className={`px-4 py-2 rounded-xl hover:scale-105 hover:translate-y-1 transition-all duration-300 font-medium text-lg ${
                  isDarkMode 
                    ? 'text-white hover:bg-white/20' 
                    : 'text-gray-900 hover:bg-black/20'
                }`}
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`px-4 py-2 rounded-xl hover:scale-105 hover:translate-y-1 transition-all duration-300 font-medium text-lg ${
                  isDarkMode 
                    ? 'text-white hover:bg-white/20' 
                    : 'text-gray-900 hover:bg-black/20'
                }`}
              >
                Contact
              </button>
            </div>

            {/* Right - Social Links & Dark/Light Mode Toggle */}
            <div className="flex items-center space-x-2">
              {/* LinkedIn Button */}
              <a
                href="https://linkedin.com/in/taebok-joseph-kim/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-xl hover:scale-110 hover:translate-y-1 transition-all duration-300 group flex-shrink-0 ${
                  isDarkMode 
                    ? 'hover:bg-white/10' 
                    : 'hover:bg-black/10'
                }`}
                aria-label="LinkedIn"
              >
                <FaLinkedin className={`w-5 h-5 group-hover:text-blue-500 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`} />
              </a>

              {/* GitHub Button */}
              <a
                href="https://github.com/T-Joseph-Kim"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-xl hover:scale-110 hover:translate-y-1 transition-all duration-300 group flex-shrink-0 ${
                  isDarkMode 
                    ? 'hover:bg-white/10' 
                    : 'hover:bg-black/10'
                }`}
                aria-label="GitHub"
              >
                <FaGithub className={`w-5 h-5 transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-white group-hover:text-gray-300' 
                    : 'text-gray-900 group-hover:text-gray-600'
                }`} />
              </a>

              {/* Dark/Light Mode Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl hover:scale-110 hover:translate-y-1 transition-all duration-300 group flex-shrink-0 ${
                  isDarkMode 
                    ? 'hover:bg-white/10' 
                    : 'hover:bg-black/10'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <FaSun className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors duration-400" />
                ) : (
                  <FaMoon className="w-5 h-5 text-gray-900 group-hover:text-blue-400 transition-colors duration-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
