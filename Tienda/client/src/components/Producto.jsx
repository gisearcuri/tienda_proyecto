import { useParams } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from '../css/Producto.module.css'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import {Link} from 'react-router-dom'

const Producto = ({onAgregar, listaProductos}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [paginaActual, setPaginaActual] = useState(0);
    const producto = listaProductos.find(producto => producto._id === id);

    useLayoutEffect(() => {
    window.scrollTo(0, 0);
    }, [id]);
    if (!producto) {
    return <p>Cargando producto...</p>;
    }


    const productosPorPagina = 5;

    const inicio = paginaActual * productosPorPagina;

    const productosVisibles = listaProductos.slice(
        inicio,
        inicio + productosPorPagina
    );

    const totalPaginas = Math.ceil(
        listaProductos.length / productosPorPagina
    );


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
                    {/*CUOTAS*/}
                    {/*<p>Stock:{producto.cantidad}</p>*/}
                    {/*COLORES DISPONIBLES//TALLES*/ }
                    <div className={style.botones}>
                        <button className={style.carrito} onClick={() => onAgregar(producto)}>AÑADIR AL CARRITO</button>
                    </div>
                </div>                   
            </div>
            {/* PRODUCTOS RECOMENDADOS */}
            <section className={style.recomendados}>
                <h2>También puede interesarte</h2>
                <div className={style.carrusel}>                    
                    <div className={style.tarjetaProducto2}>
                        {productosVisibles.map((producto) => (
                            <div className={style.tarjetaInteres} key={producto._id}> 
                                <Link  to={`/productos/${producto._id}`} className={style.linkProducto} >
                                <img className={style.tarjetaImg2} src={producto.url}alt={producto.nombre} />
                                <div className={style.tarjetaNombre2}>
                                    <h5 className={style.tarjetaTitulo}>{producto.nombre}</h5>
                                    <p className={style.productoPrecio}>${producto.precio}</p>                                    
                                </div>
                                </Link>
                                <div className={style.boton}>
                                    <button className={style.carrito} onClick={() => onAgregar(producto)}><HiOutlineShoppingBag /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                <button className={style.flecha} onClick={() => setPaginaActual(paginaActual - 1)} disabled={paginaActual === 0} > ← </button> 
                <button className={style.flecha} onClick={() => setPaginaActual(paginaActual + 1)} disabled={paginaActual === totalPaginas - 1} >  → </button>
                </div>
                <div className={style.indicadores}> {paginaActual + 1} / {totalPaginas} </div>
            </section>
        </div>    
    )


}

export default Producto;