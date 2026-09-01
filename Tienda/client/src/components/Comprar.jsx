import { useState } from "react";
import style from '../css/Comprar.module.css'
import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";


const RealizarCompra = ({ carrito, eliminarDelCarrito, sumarCantidad, restarCantidad }) => {
    const total = carrito.reduce(
        (acc, p) => acc + p.precio * p.cantidad,
        0
    )


    return (
        <div className={style.resumenCompra}>
            {carrito.map((producto, index) => (
            <div key={index} className={style.item}>
                <img src={producto.url} alt={producto.nombre} className={style.imgCarrito} />
                <Link className={style.producto}to={`/productos/${producto._id}`}>{producto.nombre}</Link>
                <p>${producto.precio}</p>
                <div className={style.cantidad}>
                    <button className={style.tantos} onClick={() => restarCantidad(producto._id)}>-</button>
                    <span>{producto.cantidad}</span>
                    <button className={style.tantos} onClick={() => sumarCantidad(producto._id)}>+</button>
                    </div>
                <button className={style.eliminar} onClick={() => eliminarDelCarrito(index)}><MdOutlineDelete />    </button>
            </div>
            ))}
            <div className={style.footerCarrito}>
                <div className={style.total}>
                    <p>Subtotal:</p>
                    <p className={style.subtotal}>${total}</p>
                </div>
                <Link to="/comprar" className={style.comprar}> Pagar </Link>
            </div>
        </div>
    )}

export default RealizarCompra;