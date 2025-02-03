import GridBox from "./GridBox"

const Visualizer = () => {

  return (
    <div className="bg-gray-950 text-white min-h-screen px-20 py-5 flex flex-col items-center">
       <p className="text-3xl">Shortest Path Finding Visualizer</p>
       <div className="mt-5">
        <GridBox/>
       </div>
    </div>
  )
}

export default Visualizer