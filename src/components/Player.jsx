import { usePlayerContext } from "../context/PlayerContext";
import PropTypes from "prop-types";

import { FaSquare } from "react-icons/fa";
// import { GrPowerReset } from "react-icons/gr";
import { FaPlay } from "react-icons/fa";
import { RiRestartLine } from "react-icons/ri";

const Player = ({ onStart, onMazeGenerate, isAnimating, isDone }) => {
  const {
    speed,
    setSpeed,
    setAlgorithm,
  } = usePlayerContext();

  const handleMaze = () => {
    onMazeGenerate()
  };

  const handleAlgorithm = (algo) => {
    setAlgorithm(algo);
  };

  const handleSpeed = (speed) => {
    setSpeed(speed);
  };

  const handlePlay = () => {
    onStart()
  };

  const handleReset = () => {
    location.reload() 
  };

  const deactiveStyle = "pointer-events-none blur-sm opacity-20";

  return (
    <div className={`flex items-center gap-4 p-3 bg-violet-950 text-white h-36 rounded-3xl shadow-md fixed bottom-2 left-1/2 scale-75 -translate-x-1/2 translate-y-[13%] ` + (isAnimating && deactiveStyle)}>
      <div className="bg-indigo-900 p-5 rounded-3xl">
        <div>
          <p className="flex items-center gap-2 text-xl font-bold">
            Points
          </p>
        </div>
        <div className="flex gap-3">
          <div
            className="flex items-center gap-2 bg-indigo-950 my-2 text-lg p-2 rounded-lg px-4 font-semibold shadow-md cursor-help"
          >
            Start <FaSquare className="text-green-500 rounded" />
          </div>
          <div
            className="flex items-center gap-2 bg-indigo-950 my-2 text-lg p-2 rounded-lg px-4 font-semibold cursor-help"
          >
            End <FaSquare className="text-red-600 rounded" />
          </div>
          <div
            className="flex items-center gap-2 bg-indigo-950 my-2 text-lg p-2 rounded-lg px-4 font-semibold cursor-help"
          >
            Wall <FaSquare className="text-white rounded" />
          </div>
        </div>
      </div>
      <div className="bg-indigo-900 p-5 rounded-3xl">
        <p className="flex items-center gap-2 text-xl font-bold">
          Maze
        </p>
        <button
          onClick={() => handleMaze()}
          disabled={isDone}
          className="bg-indigo-950 my-2 text-lg p-2 rounded-lg font-semibold"
        >
          Generate
        </button>
      </div>
      <div className="bg-indigo-900 p-5 rounded-3xl">
        <p className="text-xl font-bold">Algorithm</p>
        <select
          disabled={isDone}
          onInput={(e) => handleAlgorithm(e.target.value)}
          className="bg-indigo-950 my-2 text-lg p-2 rounded-lg px-4 font-semibold"
        >
          <option value="dijkstra">Dijkstra</option>
          {/* <option value="astar">A-Star</option>
          <option value="greedy">Greedy</option>
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option> */}
        </select>
      </div>
      <div className="bg-indigo-900 p-5 rounded-3xl">
        <p className="flex items-center gap-2 text-xl font-bold">Speed</p>
        <select
          value={speed}
          disabled={isDone}
          onInput={(e) => handleSpeed(e.target.value)}
          className="bg-indigo-950 my-2 text-lg p-2 rounded-lg font-semibold"
        >
          <option value="slow">Slow</option>
          <option value="medium">Medium</option>
          <option value="fast">Fast</option>
        </select>
      </div>
      <FaPlay
          disabled={isDone}
          onClick={handlePlay}
          className="rounded-fulltext-green-500 p-3 text-7xl cursor-pointer text-green-500 "
      />
      <RiRestartLine
        onClick={handleReset}
        className="rounded-fulltext-red-500 p-3 text-7xl cursor-pointer text-red-500 hover:text-red-400"
      />
    </div>
  );
};

Player.propTypes = {
  onStart: PropTypes.func.isRequired,
  onMazeGenerate: PropTypes.func.isRequired,
  isAnimating: PropTypes.bool.isRequired,
  isDone: PropTypes.bool.isRequired,
};

export default Player;
