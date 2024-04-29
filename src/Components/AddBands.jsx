import { useContext, useState } from "react"
import { SocketContext } from "../Context/SocketContext"



export const AddBand = ()=>{

  const { createBand } = useContext( SocketContext )
  const [value, setValue] = useState('')

  const onSubmit = (e)=>{
    e.preventDefault()
    createBand(value)
  }
    return (
        <>
         <h1>Agregar Banda</h1>
         <form onSubmit={ onSubmit }>
              <input
                value={ value }
                className="form-control"
                placeholder="Nuevo nombre"
                onChange={(e)=> setValue(e.target.value)}
              />
         </form>
        </>
    )
}