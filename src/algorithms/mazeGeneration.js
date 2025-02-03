function getRandInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function mazeGeneration(grid){

    const data = {
        wallTiles: [],
    }

    grid.flat().forEach(tile =>{
        if(tile.isStart || tile.isEnd) return
        if(getRandInt(1,4) === 3) {
            tile.setWall()
            data.wallTiles.push(tile)
        }
    })

    return data.wallTiles
}