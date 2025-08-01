import { useState } from 'react';
import DotGridBackground from './components/DotGridBackground';
import CustomCursor from './components/CustomCursor';
import TerminalLoader from './components/TerminalLoader';

function App() {
  const [fadeOutTerminal, setFadeOutTerminal] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  const handleLoaderFinish = () => {
    setFadeOutTerminal(true);
    setTimeout(() => {
      setShowMainContent(true);
    }, 400);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden cursor-none">
      <CustomCursor />
      <DotGridBackground />

      {!showMainContent && (
        <div
          className={`transition-opacity duration-800 ease-in-out ${
            fadeOutTerminal ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <TerminalLoader onFinish={handleLoaderFinish} />
        </div>
      )}

      <div
        className={`relative z-10 flex items-center justify-center h-screen text-4xl font-bold transition-opacity duration-800 ease-in ${
          showMainContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        🚀 Welcome to My Portfolio
      </div>
    </div>
  );
}

export default App;
