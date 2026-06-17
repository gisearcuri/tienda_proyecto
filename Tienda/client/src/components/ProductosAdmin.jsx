import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from '../css/ProductosAdmin.module.css'

const ProductosAdmin = ({listaProductos, setListaProductos, cerrarSesion}) => {
        const navigate = useNavigate();
        const [errors, setErrors] = useState({})
        const borrar= (id)=>{
        const URL = `http://localhost:8000/api/productosAdmin/${id}`;
        axios.delete(URL , {headers: { token_usuario: localStorage.getItem("token") }
    }
).then(
    response => {
                setListaProductos(listaProductos.filter(producto => producto._id != id))
                response.data 
                navigate('/productosAdmin')
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



    return(
        <div className={style.body}>
            {listaProductos.map((producto, index) => (
                <div className={style.tarjetaProducto} key={index}>
                    <img className={style.tarjetaImg}src={producto.url} alt={producto.nombre} ></img>
                    <div className={style.tarjetaNombre}>
                        <h5 className={style.tarjetaTitulo}>{producto.nombre}</h5>
                        <p className={style.productoDescripcion}>{producto.descripcion}</p>
                        <p className={style.productoPrecio}>{producto.precio}</p>
                        <div className={style.tarjetaBotones}>
                            <Link to={`/productosAdmin/${producto._id}`} className={style.btnEditar}>Editar</Link> <button type="submit" className={style.btnEliminar}>Eliminar</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default ProductosAdmin;