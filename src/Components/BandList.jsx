import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../Context/SocketContext"



export const BandList = ()=> {

    const { bands:data, voteBand, deleteBand, changeName } = useContext( SocketContext )
    const [ bands, setBands ] = useState(data)

    useEffect(()=>{
        setBands(data)
    }, [data])

    const onChangeName = ( event, id )=>{
        const newName = event.target.value
        setBands( bands => bands.map ( band => {
            if( band.id === id ){
                band.name = newName
            }
            return band
        } ))
    }

    const onLostFocus = ( id, name )=>{
        changeName( id, name )
    }

    const createRows = ()=>{
        return (
           bands.map( band => (
            <tr key={band.id}>
                <td>
                    <button 
                    onClick={()=> voteBand(band.id)}
                    className="btn btn-primary" >+1</button>
                </td>
                <td>
                    <input
                    value={band.name}
                    onChange={( event )=>onChangeName( event, band.id )}
                    onBlur={()=> onLostFocus( band.id, band.name )}
                    className="form-control"/>
                </td>
                <td> <h3> { band.votes } </h3> </td>
                <td>
                    <button 
                    onClick={()=> deleteBand( band.id )}
                    className="btn btn-danger"> Borrar </button>
                </td>
            </tr>
           ) )
        )
    }

    return (
        <>
         <table className="table table-stripped">
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Votos</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
                { createRows() }
            </tbody>
         </table>
        </>
    )
}