import "./App.css";
import Visualizer from "./components/Visualizer";
import ContextProvider from "./context/PlayerContext";

function App() {

  return (
    <ContextProvider>
      <Visualizer/>
    </ContextProvider>
  )
}

export default App;
