import 'bootstrap/dist/css/bootstrap.min.css'   
import 'bootstrap/dist/js/bootstrap.bundle.min.js' 
import {Link} from 'react-router-dom'
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import style from '../css/Administrador.module.css'


const ListasProductos = ({listaProductos, setListaProductos, cerrarSesion}) => {
        const navigate = useNavigate();
        const [errors, setErrors] = useState({})
        const borrar= (id)=>{
        const URL = `http://localhost:8000/api/productos/${id}`;
        axios.delete(URL , {headers: { token_usuario: localStorage.getItem("token") }}).then(
            response => {
                setListaProductos(listaProductos.filter(producto => producto._id != id))
                navigate('/productos')
            }
        ).catch(
            e => {
                console.log("ERROR COMPLETO:", e.response.data);
                if (e.status === 401){
                cerrarSesion()
                }    setErrors(e.response.data?.errors);
            }
        )
    }

    return (
        <div className={style.body}>
            {listaProductos.map((producto, index) => (
                <div className={style.tarjetaProducto} key={index}>
                    <img className={style.tarjetaImg}src={producto.url} alt={producto.nombre} ></img>
                    <div className={style.tarjetaNombre}>
                        <h5 className={style.tarjetaTitulo}>{producto.nombre}</h5>
                        <p className={style.productoDescripcion}>{producto.descripcion}</p>
                        <p className={style.productoPrecio}>{producto.precio}</p>
                        <div className={style.tarjetaBotones}>
                            <Link to={`/productos/${producto._id}`} className={style.btnDetalle}>Detalle</Link> <button type="submit" className={style.btnEliminar} onClick={() => borrar(producto._id)}>Eliminar</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListasProductos;