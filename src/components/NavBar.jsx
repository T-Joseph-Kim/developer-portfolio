import { useEffect, useState } from 'react';
import { FaHome, FaSun, FaMoon } from 'react-icons/fa';
import { LiquidGlass } from '@liquidglass/react';

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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className="sticky top-0 z-50 transition-all duration-500 ease-out px-4"
      style={{
        paddingTop: scrolled ? '1.25rem' : '2.5rem'
      }}
    >
      <div 
        className={`mx-auto transition-all duration-500 ease-out ${
          scrolled ? 'w-[90%]' : 'w-[60%]'
        }`}
      >
        <LiquidGlass
          blurAmount={10}
          elasticity={0.35}
          cornerRadius={100}
          className="rounded-2xl border border-white/20"
        >
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left - Home Icon */}
            <button
              onClick={() => scrollToSection('home')}
              className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300 group"
              aria-label="Home"
            >
              <FaHome className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors duration-300" />
            </button>

            {/* Center - Navigation Links */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => scrollToSection('experience')}
                className="px-4 py-2 rounded-xl text-white hover:text-blue-400 hover:bg-white/10 transition-all duration-300 font-medium"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="px-4 py-2 rounded-xl text-white hover:text-blue-400 hover:bg-white/10 transition-all duration-300 font-medium"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="px-4 py-2 rounded-xl text-white hover:text-blue-400 hover:bg-white/10 transition-all duration-300 font-medium"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-4 py-2 rounded-xl text-white hover:text-blue-400 hover:bg-white/10 transition-all duration-300 font-medium"
              >
                Contact
              </button>
            </div>

            {/* Right - Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300 group"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <FaSun className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors duration-300" />
              ) : (
                <FaMoon className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors duration-300" />
              )}
            </button>
          </div>
        </LiquidGlass>
      </div>
    </nav>
  );
}

export default Navbar;
