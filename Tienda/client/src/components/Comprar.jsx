import { useState } from "react";
import style from '../css/Comprar.module.css'
import { Link } from "react-router-dom";


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
                <div className={style.info}>
                    <Link to={`/productos/${producto._id}`}>{producto.nombre}</Link>
                    <p className={style.productoDescripcion}>{producto.descripcion}</p>
                    <span>${producto.precio}</span>
                </div>
                <div className={style.cantidad}>
                    <button className={style.tantos} onClick={() => restarCantidad(producto._id)}>-</button>
                    <span>{producto.cantidad}</span>
                    <button className={style.tantos} onClick={() => sumarCantidad(producto._id)}>+</button>
                    </div>
                <button className={style.eliminar} onClick={() => eliminarDelCarrito(index)}> ✕ </button>
            </div>
            ))}
            <div className={style.footerCarrito}>
                <div className={style.total}>
                    <strong>Total:</strong>
                    <strong>${total}</strong>
                </div>
                <Link to="/comprar" className={style.comprar}> Pagar </Link>
            </div>
        </div>
    )}

export default RealizarCompra;