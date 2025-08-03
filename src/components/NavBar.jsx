import { useEffect, useState } from 'react';
import { FaHome, FaSun, FaMoon } from 'react-icons/fa';
import { LiquidGlass } from '@liquidglass/react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500 ease-in-out">
      <LiquidGlass
        blur={scrolled ? 0.4 : 0}
        borderRadius={scrolled ? 20 : 0}
        saturation={scrolled ? 1.2 : 1}
        brightness={scrolled ? 1.1 : 1}
        contrast={scrolled ? 1.05 : 1}
        className="transition-all duration-500 ease-in-out w-full flex justify-center"
      >
        <div
          className={`max-w-5xl w-full mx-auto flex items-center justify-between px-6 py-2 transition-all duration-500 ease-in-out font-[Inter] text-white ${
            scrolled ? 'rounded-2xl shadow-md bg-black/40 backdrop-blur-md' : ''
          }`}
        >
          {/* Left: Home */}
          <button className="flex items-center space-x-2">
            <FaHome className="text-lg" />
          </button>

          {/* Center: Nav Links */}
          <div className="hidden md:flex space-x-6 text-sm tracking-wide">
            <button className="hover:text-gray-300 transition">Experience</button>
            <button className="hover:text-gray-300 transition">Projects</button>
            <button className="hover:text-gray-300 transition">Skills</button>
            <button className="hover:text-gray-300 transition">Contact</button>
          </div>

          {/* Right: Dark/Light Toggle */}
          <button onClick={toggleTheme} className="text-lg">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </LiquidGlass>
    </nav>
  );
}

export default Navbar;
