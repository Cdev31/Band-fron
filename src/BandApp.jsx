import { useContext } from "react"
import { AddBand } from "./Components/AddBands"
import { BandList } from "./Components/BandList"
import { SocketContext } from "./Context/SocketContext"
import { GraficBands } from "./Components/GraficBands"

export const BandApp = ()=> {

  const { online } = useContext(SocketContext)

  return (
    <div className="container">
       <div className="alert">
        <p>
          Services Status:
          {
            online 
            ? <span className="text-success" >Online</span>
            : <span className="text-danger" >Offline</span>
          }
        </p>
        <h2>BandNames</h2>
        <hr/>
        <div className="row">
          <div className="col-8">
            <GraficBands/>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
             <BandList/>
          </div>
          <div className="col-4">
              <AddBand/>
          </div>
        </div>
       </div>
    </div>
  )
}

