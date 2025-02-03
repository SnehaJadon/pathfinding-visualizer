import {Grid} from "../utils/helper"

export function dijkstra(grid, start, end){
    let tiles = [start]
    const data = {
        visitedTiles: [],
        shortestPath: [],
    }

    while(tiles.length > 0){
        tiles.sort((a,b) => a.distance - b.distance)
        const tile = tiles.shift()
        tile.isVisited = true
        data.visitedTiles.push(tile)
        if(tile === end){
            end.src = tile.src
            data.shortestPath = Grid.constructPath(end)
            return data
        }

        const neighbours = Grid.getNeighbours(grid, tile)
        for(let neighbour of neighbours){
            if(!neighbour.isVisited && !neighbour.isWall){
                // relaxation
                if(tile.distance + 1 < neighbour.distance){
                    neighbour.distance = tile.distance + 1
                    neighbour.src = tile
                    tiles.push(neighbour)
                }
            }
        }
    }

    return data
}

