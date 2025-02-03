import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const PlayerContext = createContext()

const ContextProvider = ({children})=>{

    const [startPoint, setStartPoint] = useState(null)
    const [endPoint, setEndPoint] = useState(null)
    const [tileType, setTileType] = useState("start")
    const [speed, setSpeed] = useState("fast")
    const [algorithm, setAlgorithm] = useState("dijkstra")
    const [mazeGeneration, setMazeGeneration] = useState("binarytree")

    const tileClickHandler = (tile)=>{
        if(tileType === "start"){
            setStartPoint(tile)
            tile.setStart()

            if(endPoint === null){
                setTileType("end")
            }

        }else if(tileType === "end"){
            setEndPoint(tile)
            tile.setEnd()

            setTileType("wall")
        }else if(tileType === "wall"){
            tile.toggleWall()
        }
    }

    const getSelectedSpeed = ()=>{
        const speeds = {
            "slow": 2.0,
            "medium": 1,
            "fast": 0.5,
        }
        return speeds[speed]
    }

    const value = {
        startPoint,
        setStartPoint,
        endPoint,
        setEndPoint,
        tileType,
        setTileType,
        tileClickHandler,
        speed,
        getSelectedSpeed,
        setSpeed,
        algorithm,
        setAlgorithm,
        mazeGeneration, 
        setMazeGeneration
    }
    
    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    )
}

ContextProvider.propTypes = {
    children: PropTypes.node
}

export const usePlayerContext = ()=> useContext(PlayerContext)
export default ContextProvider