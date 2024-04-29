import { useState } from "react"
import {  io } from "socket.io-client"
import { AddBand } from "./Components/AddBands"
import { BandList } from "./Components/BandList"
import { useEffect } from "react"

const connectSocketServer = ()=>{

  const socket = io('http://localhost:3000', {
    transports: ['websocket']
  })
  return socket

}

export const BandApp = ()=> {

  const [ socket ] = useState( connectSocketServer() )
  const [online, setOnline] = useState(false)
  const [ bands, setBands ] = useState([])

  useEffect(()=>{
   
    setOnline( socket.connected )
  }, [ socket ])

  useEffect(() =>{

    socket.on('connect', ()=>{
      setOnline(true)
    })

  }, [socket])

  useEffect(() =>{

    socket.on('disconnect', ()=>{
      setOnline(false)
    })

  }, [socket])
  
  useEffect(()=>{
    socket.on('current-bands', ( bands )=>{
      setBands( bands )
    })
  }, [socket])

  const voteBand = (id)=>{
    socket.emit('vote-band', id)
  }

  const deleteBand = ( id )=>{
    socket.emit('delete-band', id)
  }

  const changeName = ( id, name )=>{
    socket.emit('change-name-band', { id, name })
  }

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
             <BandList
              vote={voteBand}
              deleteBand={deleteBand}
              changeName={changeName}
              data={bands}
             />
          </div>
          <div className="col-4">
              <AddBand/>
          </div>
        </div>
       </div>
    </div>
  )
}

