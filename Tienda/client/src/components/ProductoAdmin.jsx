import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from '../css/DetalleProducto.module.css'

const ProductoAdmin = ({listaProductos, setListaProductos, cerrarSesion}) => {
    const [persona, setPersona] = useState({})
    const [errors, setErrors] = useState('')
    const {id} = useParams();
    const URL = `http://localhost:8000/api/productos/${id}`
    const navigate = useNavigate();

    const getData = ()=>{
        axios(URL, {headers : {token_usuario : localStorage.getItem("token")}}).then(response =>
            setPersona(response.data)
        ).catch(e => {
                    setErrors(e)
                    if (e.status === 401){
                        cerrarSesion()
                        } 
                    }
                ) 
            }

    useEffect(()=>{
        getData()
    },[])


    const borrar= ()=>{
        axios.delete(URL , {headers: { token_usuario: localStorage.getItem("token") }}).then(
            response => {
                setListaProductos(listaProductos.filter(producto => producto._id != id))
                navigate('/productosAdmin')
            }
        ).catch(
            e => console.log(e)
        )
    }

    const updateProducto = ()=>{
        navigate(`/productos/update/${id}`)
    }

    return(
        <div className={style.body}>
            <div className={style.tarjetaProducto}>
                <div >
                    <img className={style.tarjetaImg} src={persona.url} alt={persona.nombre} ></img>
                </div>                
                <div className={style.detalles}>
                    <h1>{persona.nombre}</h1>
                    <p>{persona.descripcion}</p>
                    <p>{persona.precio}</p>
                    <p>{persona.codigo}</p>
                    <p>Cantidad:{persona.cantidad}</p>
                    <div className={style.botones}>
                        <button type="submit" className={style.btnEliminar} onClick={borrar}>Eliminar</button> <button type="submit" className={style.btnEditar} onClick={updateProducto}>Editar</button> 
                    </div>
                </div>
                
            </div>
        </div>    
    )

}

export default ProductoAdmin;