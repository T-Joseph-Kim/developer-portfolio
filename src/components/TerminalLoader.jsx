import { useEffect, useState } from 'react';

const terminalLines = [
  'building about section',
  'implementing education section',
  'wiring up experience section',
  'rendering projects section',
  'polishing contact links',
  'finalizing responsive layout',
  'success! ready in 5.9s — starting dev server...',
];

const spinnerFrames = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'];

function TerminalLoader({ onFinish }) {
  const [typedText, setTypedText] = useState('');
  const [currentLine, setCurrentLine] = useState(-1);
  const [spinnerFrame, setSpinnerFrame] = useState(0);

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
    <div className="fixed inset-0 flex items-center justify-center z-[9999] font-mono text-sm text-green-400">
      <div className="bg-zinc-950 rounded-xl shadow-lg w-[60%] max-w-2xl h-[40%] border border-zinc-700 flex flex-col overflow-hidden">
        {/* termninal header */}
        <div className="relative flex items-center px-3 py-2 bg-zinc-900 border-b border-zinc-700 rounded-t-2xl">
            <div className="flex space-x-2 z-10">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 text-white text-xs flex items-center space-x-2">
                <span>📁</span>
                <span>welcome terminal — bash</span>
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
