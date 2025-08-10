import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const terminalLines: string[] = [
  'building about section',
  'implementing education section',
  'wiring up experience section',
  'rendering projects section',
  'polishing contact links',
  'finalizing responsive layout',
  'success! ready in 5.9s — starting dev server...',
];

const spinnerFrames: string[] = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'];

interface TerminalLoaderProps {
  onFinish: () => void;
}

function TerminalLoader({ onFinish }: TerminalLoaderProps): React.JSX.Element {
  const [typedText, setTypedText] = useState<string>('');
  const [currentLine, setCurrentLine] = useState<number>(-1);
  const [spinnerFrame, setSpinnerFrame] = useState<number>(0);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fullText = '> npm run dev joseph-portfolio';
    let index = 0;

    const type = () => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
        setTimeout(type, 35);
      } else {
        let i = 0;
        const interval = setInterval(() => {
            setCurrentLine(i);
            i++;
            if (i === terminalLines.length) {
                clearInterval(interval);
                setTimeout(onFinish, 1000);
            }
        }, 600);
      }
    };

    type();
  }, [onFinish]);

  useEffect(() => {
    const frameInterval = setInterval(() => {
      setSpinnerFrame((prev) => (prev + 1) % spinnerFrames.length);
    }, 80);
    return () => clearInterval(frameInterval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-mono text-sm">
      <div className={`rounded-xl shadow-lg w-[60%] max-w-2xl h-[40%] border flex flex-col overflow-hidden ${
        isDarkMode 
          ? 'bg-zinc-950 border-zinc-700' 
          : 'bg-white border-gray-300'
      }`}>
        {/* terminal header */}
        <div className={`relative flex items-center px-3 py-2 border-b rounded-t-2xl ${
          isDarkMode 
            ? 'bg-zinc-900 border-zinc-700' 
            : 'bg-gray-100 border-gray-300'
        }`}>
            <div className="flex space-x-2 z-10">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>

            <div className={`absolute left-1/2 -translate-x-1/2 text-xs flex items-center space-x-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
                <span>📁</span>
                <span>welcome terminal — bash</span>
            </div>
        </div>


        {/* Terminal output */}
        <div className="flex-1 px-4 py-3 overflow-y-auto">
          <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>{typedText}</div>

          {terminalLines.map((line, index) => {
            if (index < currentLine) {
              return (
                <div
                  key={index}
                  className={`opacity-0 animate-fade-slide ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    animationFillMode: 'forwards',
                  }}
                >
                  ✔ {line}
                </div>
              );
            } else if (index === currentLine) {
              return (
                <div key={index} className={`flex items-center ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}>
                  <span className="w-4 inline-block">{spinnerFrames[spinnerFrame]}</span>{' '}
                  <span>{line}</span>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default TerminalLoader;
