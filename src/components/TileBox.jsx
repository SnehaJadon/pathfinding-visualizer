import PropTypes from "prop-types";
import { usePlayerContext } from "../context/PlayerContext";
import {
  TILE_STYLE,
  START_TILE_STYLE,
  END_TILE_STYLE,
  WALL_TILE_STYLE,
  MAX_ROWS,
  MAX_COLS,
} from "../utils/helper";
import {twMerge} from 'tailwind-merge';
const TileBox = ({ tile, setGridHandler, isMouseDown }) => {
  const { tileClickHandler, tileType } = usePlayerContext();

  let tileStyle = TILE_STYLE;

  const getConditionalTileStyle = () => {
    let style = "";
    if (tile.isStart) style = " !bg-green-500";
    else if (tile.isEnd) style = " !bg-red-600";
    else if (tile.isWall) style = " !bg-white";
    return style;
  };

  switch (tileType) {
    case "start":
      tileStyle = START_TILE_STYLE + getConditionalTileStyle();
      break;
    case "end":
      tileStyle = END_TILE_STYLE + getConditionalTileStyle();
      break;
    case "wall":
      tileStyle = WALL_TILE_STYLE + getConditionalTileStyle();
      break;
  }

  const onHandleClick = (tile) => {
    if (tileType === "wall") return;
    tileClickHandler(tile);

    setGridHandler(tile);
  };

  const onHandleMouseDown = (tile) => {
    if (tileType !== "wall" || !isMouseDown) return;

    tile.toggleWall();

    setGridHandler(tile);
  };

  return (
    <span
      id={`${tile.row}-${tile.col}`}
      onClick={() => onHandleClick(tile)}
      onMouseEnter={() => onHandleMouseDown(tile)}
      className={
        twMerge(
          
          // Base classes
          "flex items-center justify-center",
          // Control Grid height - for large, medium , extra small and for default screen sizes
          `lg:min-h-[${MAX_ROWS * 17}px]  md:min-h-[${
            MAX_ROWS * 15
          }px] xs:min-h-[${MAX_ROWS * 8}px] min-h-[${MAX_ROWS * 7}px]`,
          // Controlling grid width
          `lg:w-[${MAX_COLS * 17}px] md:w-[${MAX_COLS * 15}px] xs:w-[${
            MAX_COLS * 8
          }px] w-[${MAX_COLS * 7}px]`,
          tileStyle,
        )
      }
    ></span>
  );
};

TileBox.propTypes = {
  tile: PropTypes.object.isRequired,
  gridObj: PropTypes.object.isRequired,
  setGrid: PropTypes.func.isRequired,
  setGridHandler: PropTypes.func.isRequired,
  isMouseDown: PropTypes.bool.isRequired,
};

export default TileBox;
