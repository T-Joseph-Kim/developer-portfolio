import { useState, useEffect } from 'react';
import DotGridBackground from './components/DotGridBackground';
import CustomCursor from './components/CustomCursor';
import TerminalLoader from './components/TerminalLoader';
import Navbar from './components/NavBar';

function App() {
  const [fadeOutTerminal, setFadeOutTerminal] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

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

  const handleLoaderFinish = () => {
    setFadeOutTerminal(true);
    setTimeout(() => {
      setShowMainContent(true);
    }, 400);
  };

  return (
    <div className="relative bg-black text-white cursor-none">
      <CustomCursor />
      <DotGridBackground />

      {/* Only show navbar after terminal finishes */}
      {showMainContent && <Navbar />}

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
        <section className="h-screen flex items-center justify-center text-4xl font-bold">
          🚀 Welcome to My Portfolio
        </section>

        <section className="h-screen flex items-center justify-center text-3xl">
          📚 Education Section
        </section>

        <section className="h-screen flex items-center justify-center text-3xl">
          💼 Experience Section
        </section>

        <section className="h-screen flex items-center justify-center text-3xl">
          🛠️ Projects Section
        </section>

        <section className="h-screen flex items-center justify-center text-3xl">
          📫 Contact Section
        </section>
      </div>
    </div>
  );
}

export default App;
