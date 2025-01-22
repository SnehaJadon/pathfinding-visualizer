import { Grid } from "./components/Grid"
import { PathfindingProvider } from "./context/PathfindingContext"
import { SpeedProvider } from "./context/Speed"
import { TileProvider } from "./context/TileContext"

function App() {

  return (
    <PathfindingProvider>
      <TileProvider>
        <SpeedProvider>
          <div className="h-screen w-screen flex flex-col">
            <Grid/>
          </div>
        </SpeedProvider>
      </TileProvider>
    </PathfindingProvider>

  )
}

export default App
