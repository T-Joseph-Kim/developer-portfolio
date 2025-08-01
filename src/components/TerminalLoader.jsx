import { useEffect, useState } from 'react';

const terminalLines = [
  'Building About section',
  'Implementing Education section',
  'Wiring up Experience section',
  'Rendering Projects section',
  'Polishing Contact links',
  'Finalizing responsive layout',
  'Success! Launching portfolio now...',
];

const spinnerFrames = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'];

function TerminalLoader({ onFinish }) {
  const [typedText, setTypedText] = useState('');
  const [currentLine, setCurrentLine] = useState(-1);
  const [spinnerFrame, setSpinnerFrame] = useState(0);

  useEffect(() => {
    const fullText = '> npm install joseph-portfolio';
    let index = 0;

    const type = () => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
        setTimeout(type, 35);
      } else {
        let i = 1;
        const interval = setInterval(() => {
            setCurrentLine(i);
            i++;
            if (i === terminalLines.length) {
                clearInterval(interval);
                setTimeout(onFinish, 1000);
            }
        }, 800);
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
    <div className="fixed inset-0 flex items-center justify-center z-[9999] font-mono text-sm text-green-400">
      <div className="bg-zinc-900 rounded-lg shadow-lg w-[85%] max-w-2xl h-[40%] border border-zinc-700 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center px-3 py-2 bg-zinc-800 border-b border-zinc-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
        </div>

        {/* Terminal output */}
        <div className="flex-1 px-4 py-3 overflow-y-auto">
          <div className="text-white">{typedText}</div>

          {terminalLines.map((line, index) => {
            if (index < currentLine) {
              return (
                <div
                  key={index}
                  className="text-green-400 opacity-0 animate-fade-slide"
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
                <div key={index} className="text-green-400 flex items-center">
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
