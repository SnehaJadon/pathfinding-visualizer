import { useEffect, useMemo, useState } from "react";
import { usePlayerContext } from "../context/PlayerContext";

import Player from "./Player";
import TileBox from "./TileBox";

import { dijkstra } from "../algorithms/dijkstra";
import { mazeGeneration } from "../algorithms/mazeGeneration";
import {
  Grid,
  PATH_TILE_STYLE,
  TRAVERSED_TILE_STYLE,
  WALL_TILE_STYLE_ANIME,
  SLEEP_TIME,
  EXTENDED_SLEEP_TIME,
  MAX_ROWS,
  MAX_COLS
} from "../utils/helper";

const GridBox = () => {
  const { startPoint, endPoint, getSelectedSpeed } = usePlayerContext();

  let gridObj = useMemo(
    () => new Grid(MAX_ROWS, MAX_COLS),
    []
  );

  const [grid, setGrid] = useState(gridObj.grid);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false)
  const [isDone, setIsDone] = useState(false)

  // const animationToggle = ()=>{
  //   setIsAnimating(!isAnimating)
  //   if(isAnimating){
  //     setTileType("animation")
  //   }else{
  //     setTileType("wall")
  //   }
  // }

  let algoOutput = {
    visitedTiles: [],
    shortestPath: [],
    wallTiles: [],
  };

  useEffect(() => {
    gridObj.updateGrid(grid);
  }, [grid, gridObj]);

  const setGridHandler = (tile) => {
    setGrid((prev) => {
      const newGrid = prev.slice();
      newGrid[tile.row][tile.col] = tile;
      return newGrid;
    });
  };

  const animateWallTiles = () => {
    let wallTiles = algoOutput.wallTiles;
    let selectedSpeed = 0.5;

    for (let i in wallTiles) {
      let tile = wallTiles[i];
      if (tile.isStart || tile.isEnd) {
        continue;
      }
      setTimeout(() => {
        let tileDom = document.getElementById(`${tile.row}-${tile.col}`);
        tileDom.className = `${WALL_TILE_STYLE_ANIME} animate-wall`;
      }, SLEEP_TIME * i * selectedSpeed);
    }
  };
  const animatePaths = () => {
    let visitedTiles = algoOutput.visitedTiles;
    let shortestPath = algoOutput.shortestPath;
    let selectedSpeed = getSelectedSpeed();

    for (let i in visitedTiles) {
      let tile = visitedTiles[i];
      if (tile.isStart || tile.isEnd) {
        continue;
      }
      setTimeout(() => {
        let tileDom = document.getElementById(`${tile.row}-${tile.col}`);
        tileDom.className = `${TRAVERSED_TILE_STYLE} animate-traversed`;
      }, SLEEP_TIME * i * selectedSpeed);
    }

    setTimeout(() => {
      for (let i in shortestPath) {
        let tile = shortestPath[i];
        if (tile.isStart || tile.isEnd) {
          continue;
        }
        setTimeout(() => {
          let tileDom = document.getElementById(`${tile.row}-${tile.col}`);
          tileDom.className = `${PATH_TILE_STYLE} animate-path`;
        }, EXTENDED_SLEEP_TIME * i * selectedSpeed);

      }

      // * for setting animation done
      setTimeout(() => {
        setIsAnimating(false)
      }, EXTENDED_SLEEP_TIME * shortestPath.length * selectedSpeed + 2000);

    }, SLEEP_TIME * visitedTiles.length * selectedSpeed);


  };

  const onStart = () => {
    // gridObj.log.grid();
    setIsAnimating(true)
    setIsDone(true)
    algoOutput = dijkstra(gridObj.grid, startPoint, endPoint);


    animatePaths();
    // gridObj.log.path();
  };

  const onMazeGenerate = () => {
    algoOutput.wallTiles = mazeGeneration(gridObj.grid);

    animateWallTiles();
    // Display the grid after maze generation
    // gridObj.log.grid();
  };

  return (
    <div>
      <div
        className={`grid w-fit ` + ((isAnimating || isDone) && "pointer-events-none")}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        style={{
          gridTemplateColumns: `repeat(${MAX_COLS}, minmax(0,1fr))`,
        }}
      >
        {grid.flat().map((tile, index) => {
          return (
            <TileBox
              key={index}
              tile={tile}
              setGridHandler={setGridHandler}
              setGrid={setGrid}
              gridObj={gridObj}
              isMouseDown={isMouseDown}
            />
          );
        })}
      </div>

      <Player onStart={onStart} onMazeGenerate={onMazeGenerate} isAnimating={isAnimating} isDone={isDone}/>
    </div>
  );
};

export default GridBox;
