import React, { useEffect, useState, useRef } from 'react';
import { FaLinkedin, FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import TJKLogoWhite from '../assets/TJK_WT.png';
import TJKLogoBlack from '../assets/TJK_BLK.png';
import { useTheme } from '../contexts/ThemeContext';

function Navbar(): React.JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const startY = useRef(0);
  const dragging = useRef(false);
  const { isDarkMode, toggleTheme } = useTheme();

  // Better scroll lock with resize handling
  useEffect(() => {
    const updateScrollLock = () => {
      if (menuOpen && window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    updateScrollLock();
    window.addEventListener('resize', updateScrollLock);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', updateScrollLock);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);

      const sections = ['home', 'experience', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;
      let currentSection = 'home';

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          if (scrollPosition >= elementTop) {
            currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string): void => {
    setMenuOpen(false);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- Drag Handlers (Touch + Mouse) ---
  const startDrag = (y: number) => {
    startY.current = y;
    dragging.current = true;
  };

  const moveDrag = (y: number) => {
    if (!dragging.current) return;
    const delta = y - startY.current;
    if (delta > 0) setDragY(delta); // only drag downward
  };

  const endDrag = () => {
    if (dragY > 100) {
      setMenuOpen(false); // close if pulled far enough
    }
    setDragY(0);
    dragging.current = false;
  };

  return (
    <>
      {/* Top Nav */}
      <nav
        className="sticky top-0 z-50 transition-all duration-300 ease-out px-4"
        style={{
          paddingTop: scrolled ? '1rem' : '2rem',
          fontFamily:
            '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div className={`mx-auto transition-all duration-300 ease-out ${scrolled ? 'w-[95%]' : 'w-[90%]'}`}>
          <div
            className={`rounded-2xl transition-all duration-300 ${
              scrolled
                ? `backdrop-blur-sm shadow-lg ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`
                : 'bg-transparent'
            }`}
          >
            <div className="flex items-center justify-between w-full px-4 py-3 md:px-8 md:py-5">
              {/* Logo */}
              <button
                onClick={() => scrollToSection('home')}
                className={`p-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:translate-y-1 ${
                  isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                }`}
              >
                <img
                  src={isDarkMode ? TJKLogoWhite : TJKLogoBlack}
                  alt="TJK Logo"
                  className="w-10 h-10 object-contain transition-all duration-300"
                />
              </button>

              {/* Desktop Nav Links */}
              <div
                className={`hidden md:flex items-center transition-all duration-300 ease-out ${
                  scrolled ? 'space-x-12' : 'space-x-8'
                }`}
              >
                {['experience', 'projects', 'skills', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-4 py-2 rounded-xl font-medium text-lg transition-all duration-300 transform
                      ${activeSection === section
                        ? (isDarkMode ? 'bg-white/20 scale-105 translate-y-1' : 'bg-black/20 scale-105 translate-y-1')
                        : (isDarkMode
                            ? 'hover:bg-white/20 hover:scale-105 hover:translate-y-1'
                            : 'hover:bg-black/20 hover:scale-105 hover:translate-y-1')}
                      ${isDarkMode ? 'text-white' : 'text-gray-900'}
                    `}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-2">
                <a
                  href="https://linkedin.com/in/taebok-joseph-kim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:translate-y-1 ${
                    isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                  }`}
                >
                  <FaLinkedin className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
                </a>
                <a
                  href="https://github.com/T-Joseph-Kim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:translate-y-1 ${
                    isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                  }`}
                >
                  <FaGithub className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
                </a>

                <div className="p-2 rounded-xl transition-all duration-300">
                  <DarkModeSwitch
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    size={20}
                    sunColor="#000000"
                    moonColor="#ffffff"
                  />
                </div>

                {/* Hamburger */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden p-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:translate-y-1"
                >
                  <FaBars className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Bottom Sheet */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-transform duration-600 ease-in-out ${
          menuOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ transform: `translateY(${dragY}px)` }}
        // Touch events
        onTouchStart={(e) => startDrag(e.touches[0].clientY)}
        onTouchMove={(e) => moveDrag(e.touches[0].clientY)}
        onTouchEnd={endDrag}
        // Mouse events (desktop)
        onMouseDown={(e) => startDrag(e.clientY)}
        onMouseMove={(e) => moveDrag(e.clientY)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        <div
          className={`w-full h-full flex flex-col rounded-t-2xl backdrop-blur-lg ${
            isDarkMode ? 'bg-gray-900/60' : 'bg-white/60'
          }`}
          style={{
            fontFamily:
              '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          {/* Handle bar */}
          <div
            className="w-24 h-1 rounded-full mx-auto mt-3 mb-4 cursor-grab active:cursor-grabbing"
            style={{ backgroundColor: isDarkMode ? '#ccc' : '#333' }}
          ></div>

          {/* Header row */}
          <div className="flex justify-between items-center px-6 mb-6">
            <button
              onClick={() => scrollToSection('home')}
              className="p-1 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={isDarkMode ? TJKLogoWhite : TJKLogoBlack}
                alt="TJK Logo"
                className="w-16 h-16 object-contain"
              />
            </button>
            <button onClick={() => setMenuOpen(false)}>
              <FaTimes className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
            </button>
          </div>

          {/* Section buttons */}
          <div className="flex flex-col space-y-3 px-6">
            {['experience', 'projects', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`py-2 text-2xl text-left transition-all duration-200 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
