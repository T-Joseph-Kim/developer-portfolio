import React, { useState, useEffect } from 'react';
import DotGridBackground from './components/DotGridBackground';
import CustomCursor from './components/CustomCursor';
import TerminalLoader from './components/TerminalLoader';
import Navbar from './components/NavBar';
import ScrollProgressBar from './components/ScrollProgressBar';
import ScrollToTop from './components/ScrollToTop';

function App(): React.JSX.Element {
  const [fadeOutTerminal, setFadeOutTerminal] = useState<boolean>(false);
  const [showMainContent, setShowMainContent] = useState<boolean>(false);

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
    <div className="relative bg-black text-white">
      <CustomCursor />
      <DotGridBackground />

      {/* Scroll Progress Bar - only show after terminal finishes */}
      {showMainContent && <ScrollProgressBar />}

      {/* Only show navbar after terminal finishes */}
      {showMainContent && <Navbar />}

      {/* Scroll to top button - only show after terminal finishes */}
      {showMainContent && <ScrollToTop />}

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
        <section id="home" className="h-screen flex items-center justify-center text-4xl font-bold">
          🚀 Welcome to My Portfolio
        </section>

        <section id="education" className="h-screen flex items-center justify-center text-3xl">
          📚 Education Section
        </section>

        <section id="experience" className="h-screen flex items-center justify-center text-3xl">
          💼 Experience Section
        </section>

        <section id="projects" className="h-screen flex items-center justify-center text-3xl">
          🛠️ Projects Section
        </section>

        <section id="skills" className="h-screen flex items-center justify-center text-3xl">
          🎯 Skills Section
        </section>

        <section id="contact" className="h-screen flex items-center justify-center text-3xl">
          📫 Contact Section
        </section>
      </div>
    </div>
  );
}

export default App;
