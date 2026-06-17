import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from '../css/Producto.module.css'
import { AiOutlineShoppingCart } from "react-icons/ai";

const Producto = ({onAgregar, listaProductos}) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const producto = listaProductos.find(p => p._id === id);

    if (!producto) {
    return <p>Cargando producto...</p>;
    }


    return(
        <div className={style.body}>
            <div className={style.tarjetaProducto}>
                <div >
                    <img className={style.tarjetaImg} src={producto.url} alt={producto.nombre} ></img>
                </div>                
                <div className={style.detalles}>
                    <h1>{producto.nombre}</h1>
                    <p>{producto.descripcion}</p>
                    <p>${producto.precio}</p>
                    <p>Codigo del producto:     {producto.codigo}</p>
                    <p>Stock:{producto.cantidad}</p>
                    <div className={style.botones}>
                        <button className={style.carrito} onClick={() => onAgregar(producto)}>Agregar al carrito<AiOutlineShoppingCart /></button>
                    </div>
                </div>                
            </div>
        </div>    
    )


}

export default Producto;