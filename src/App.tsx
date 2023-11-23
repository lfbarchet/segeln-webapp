import Header from "./components/Header";
import TestButton from "./components/TestButtons";
import CubeWindow from "./components/cubedisplay/CubeWindow";

function App() {
  return (
    <div className="flex relative">
      <div className="px-7 min-h-screen h-fit bg-fft-yellow flex-1">
        <Header />
        <TestButton />
        <CubeWindow />
      </div>
    </div>
  );
}

export default App;
