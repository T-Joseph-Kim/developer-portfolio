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

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-2 transition-all duration-500 font-[Inter] text-white 
        ${scrolled ? 'backdrop-blur-md bg-black/40 py-3 rounded-b-2xl shadow-md' : ''}`}
    >
      {/* Left: Home */}
      <button className="flex items-center space-x-2">
        <FaHome className="text-lg" />
        <span className="hidden sm:inline">Home</span>
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
    </nav>
  );
}

export default Navbar;