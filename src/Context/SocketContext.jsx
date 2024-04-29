import { createContext, useEffect, useState } from "react";
import { useSocket } from "../Hooks/useSocket";


export const SocketContext = createContext()

export const SocketProvider = ({ children })=>{
    
    const { socket, online } = useSocket('http://localhost:3000')
    const [ bands, setBands ] = useState([])
    
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

    const createBand = ( name )=>{
        socket.emit('add-band', { bandName: name })
    }


    return (
        <SocketContext.Provider value={{
            socket,
            online,
            voteBand,
            deleteBand,
            changeName,
            createBand,
            bands
            }} >
            { children }
        </SocketContext.Provider>
    )
}
