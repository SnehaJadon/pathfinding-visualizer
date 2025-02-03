export class Tile {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.isWall = false;
    this.isVisited = false;
    this.isStart = false;
    this.isEnd = false;
    this.isPath = false;
    this.src = null;
    this.distance = Infinity;
  }
  toggleWall(){
    if(this.isStart || this.isEnd) return
    this.isWall = !this.isWall
    return this
  }
  setWall() {
    if(this.isStart || this.isEnd) return
    this.isWall = true;
    return this;
  }
  removeWall() {
    if(this.isStart || this.isEnd) return
    this.isWall = false;
    return this;
  }
  setStart() {
    this.distance = 0;
    this.isStart = true;
    return this;
  }
  removeStart() {
    this.isStart = false;
    return this;
  }
  setEnd() {
    this.isEnd = true;
    return this;
  }
  removeEnd(){
    this.isEnd = false
    return this
  }
  setPath() {
    this.isPath = true;
    return this;
  }
  removePath() {
    this.isPath = false;
    return this;
  }
}
export class Grid {
  constructor(maxRows = 40, maxCols = 50) {
    this.MAX_ROWS = maxRows;
    this.MAX_COLS = maxCols;
    this.grid = this.createGrid();
  }
  createGrid() {
    const grid = [];
    for (let i = 0; i < this.MAX_ROWS; i++) {
      const row = [];
      for (let j = 0; j < this.MAX_COLS; j++) {
        row.push(new Tile(i, j));
      }
      grid.push(row);
    }
    return grid;
  }
  updateGrid(grid){
    this.grid = grid
  }
  setStart(row, col) {
    this.startTile = this.grid[row][col].setStart();
    return this.startTile;
  }
  setEnd(row, col) {
    this.endTile = this.grid[row][col].setEnd();
    return this.endTile;
  }
  setWalls(walls) {
    for (let wall of walls) {
      let row = wall[0];
      let col = wall[1];
      this.grid[row][col].setWall();
    }
  }

  static getNeighbours(grid, tile) {
    const neighbours = [];
    const { row, col } = tile;
    // top
    if (0 < row) neighbours.push(grid[row - 1][col]);
    // bottom
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    // left
    if (0 < col) neighbours.push(grid[row][col - 1]);
    // right
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    return neighbours;
  }
  static constructPath(end) {
    const path = [];
    let current = end;
    while (current !== null) {
      current.setPath();
      path.unshift(current);
      current = current.src;
    }
    return path;
  }
  log = {
    path: ()=>{
      let gridPath = "";
      for (let i = 0; i < this.grid.length; i++) {
        let rowPath = "";
        for (let j = 0; j < this.grid[0].length; j++) {
          let tile = this.grid[i][j];
          if (tile.isStart) {
            rowPath += "S ";
          } else if (tile.isEnd) {
            rowPath += "E ";
          } else if (tile.isPath) {
            rowPath += "P ";
          } else {
            rowPath += "- ";
          }
        }
        gridPath += rowPath + "\n";
      }
      console.log(gridPath);
    },
    grid: ()=>{
      let gridDis = "";
      for (let row of this.grid) {
        let rowDis = "";
        for (let tile of row) {
          let dis = tile.distance === Infinity ? "∞" : tile.distance;
          if(tile.isStart) dis = "S";
          else if(tile.isEnd) dis = "E";
          else if(tile.isWall) dis = "W"
          rowDis += dis + " ";
        }
        gridDis += rowDis + "\n";
      }
      console.log(gridDis);
    },
  };
}

export const TILE_STYLE = "w-5 h-5 border border-white cursor-pointer";
export const START_TILE_STYLE = TILE_STYLE + ` hover:bg-green-500`;
export const END_TILE_STYLE = TILE_STYLE + ` hover:bg-red-600`;
export const WALL_TILE_STYLE = TILE_STYLE + ` hover:bg-white`;
export const ANIMATION_TILE_STYLE = TILE_STYLE + ` pointer-eventers-none`;
export const TRAVERSED_TILE_STYLE = TILE_STYLE + ` bg-cyan-500`;
export const PATH_TILE_STYLE = TILE_STYLE + ` bg-green-600`;
export const WALL_TILE_STYLE_ANIME = TILE_STYLE + ` bg-white`

export const SLEEP_TIME = 8;
export const EXTENDED_SLEEP_TIME = 30;

export const MAX_ROWS = 34;
export const MAX_COLS = 49;

