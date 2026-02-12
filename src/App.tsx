import React, { useState, useEffect } from 'react';
import DotGridBackground from './components/DotGridBackground';
import CustomCursor from './components/CustomCursor';
import TerminalLoader from './components/TerminalLoader';
import Navbar from './components/NavBar';
import ScrollProgressBar from './components/ScrollProgressBar';
import ScrollToTop from './components/ScrollToTop';
import ProfileCard from './components/ProfileCard';
import About from './components/About';
import ScrollArrow from './components/ScrollArrow';
import ActivityHubSection from './components/ActivityHubSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import { useTheme } from './contexts/ThemeContext';

function App(): React.JSX.Element {
  const [fadeOutTerminal, setFadeOutTerminal] = useState<boolean>(false);
  const [showMainContent, setShowMainContent] = useState<boolean>(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (!showMainContent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup just in case
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMainContent]);

  const handleLoaderFinish = (): void => {
    setFadeOutTerminal(true);
    setTimeout(() => {
      setShowMainContent(true);
    }, 400);
  };

  return (
    <div className={`relative transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-black text-white' 
        : 'bg-white text-gray-900'
    }`}>
      <CustomCursor />
      <DotGridBackground />

      {/* Scroll Progress Bar - only show after terminal finishes */}
      {showMainContent && <ScrollProgressBar />}

      {/* Only show navbar after terminal finishes */}
      {showMainContent && <Navbar />}

      {/* Scroll to top button - only show after terminal finishes */}
      {showMainContent && <ScrollToTop />}

      {showMainContent && <ScrollArrow />}

      {!showMainContent && (
        <div
          className={`transition-opacity duration-900 ease-in-out ${
            fadeOutTerminal ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <TerminalLoader onFinish={handleLoaderFinish} />
        </div>
      )}

      {/* Main content */}
      <div
        className={`relative z-10 transition-opacity duration-900 ease-in ${
          showMainContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <section
          id="home"
          className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 max-w-6xl w-full mx-auto">
            {/* About component - left side */}
            <div className="flex flex-col items-center md:items-start">
              <About />
            </div>

            {/* ProfileCard - right side */}
            <div className="flex flex-col items-center md:items-start scale-90 md:scale-95 lg:scale-90 origin-center">
              <ProfileCard />
            </div>
          </div>
        </section>

        <section id="activity" className="py-0">
          <ActivityHubSection />
        </section>

        <section id="experience" className="py-0">
          <ExperienceSection />
        </section>

        <section id="projects" className="py-0">
          <ProjectsSection />
        </section>

        <section id="skills" className="py-0">
          <SkillsSection />
        </section>

        <section id="contact" className="py-0">
          <ContactSection />
        </section>

        <div className={`pb-8 text-center text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Thank you for looking through my portfolio website! Have a good day :)
        </div>
      </div>
    </div>
  );
}

export default App;




