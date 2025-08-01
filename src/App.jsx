import DotGridBackground from './components/DotGridBackground';
import CustomCursor from './components/CustomCursor';


function App() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden cursor-none">
      <CustomCursor color="white"/>
      <DotGridBackground />
      <div className="relative z-10 flex items-center justify-center h-screen text-4xl font-bold">
        🚀 Welcome to My Portfolio
      </div>
    </div>
  );
}

export default App;
