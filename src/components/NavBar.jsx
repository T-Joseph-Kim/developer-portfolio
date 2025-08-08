import { useEffect, useState } from 'react';
import { FaHome, FaSun, FaMoon } from 'react-icons/fa';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId) => {
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
            ? 'backdrop-blur-sm bg-white/10 shadow-lg' 
            : 'bg-transparent'
        }`}>
          <div className={`flex items-center justify-between w-full transition-all duration-400 ${
            scrolled ? 'px-8 py-5' : 'px-6 py-4'
          }`}>
            {/* Left - Home Icon */}
            <button
              onClick={() => scrollToSection('home')}
              className="p-2 rounded-xl hover:bg-white/10 hover:scale-110 transition-all duration-400 group flex-shrink-0"
              aria-label="Home"
            >
              <FaHome className="w-5 h-5 text-white duration-300" />
            </button>

            {/* Center - Navigation Links */}
            <div className={`flex items-center flex-1 justify-center transition-all duration-400 ${
              scrolled ? 'space-x-12' : 'space-x-8'
            }`}>
              <button
                onClick={() => scrollToSection('experience')}
                className="px-4 py-2 rounded-xl text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 font-medium text-lg"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="px-4 py-2 rounded-xl text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 font-medium text-lg"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="px-4 py-2 rounded-xl text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 font-medium text-lg"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-4 py-2 rounded-xl text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 font-medium text-lg"
              >
                Contact
              </button>
            </div>

            {/* Right - Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl hover:bg-white/10 hover:scale-110 transition-all duration-300 group flex-shrink-0"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <FaSun className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors duration-400" />
              ) : (
                <FaMoon className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors duration-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
