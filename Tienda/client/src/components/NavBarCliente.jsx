import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import style from '../css/NavBarCliente.module.css';
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";


const NavBarCliente = ({cerrarSesion,carrito,totalItems, eliminarDelCarrito, sumarCantidad, restarCantidad}) => {
        const [open, setOpen] = useState(false)
        const [categorias, setCategorias] = useState([]);
        const allCarrito = () => {
        setOpen(prev => !prev)
    }
        const total = carrito.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
    )

        useEffect(() => {
        axios
        .get("http://localhost:8000/api/categoria")
        .then(res => setCategorias(res.data))
        .catch(err => console.error("Error al traer categorías", err));
    }, []);
    
    return(
        <nav>
            <div className={style.navBar}>
                <div className={style.logo}>
                    <h1>Nombre+logo</h1>
                </div>
                <div className={style.navLinks}>
                    <div className={style.despliegue}>
                        <button className={style.productos}>Productos</button>
                        <div className={style.menuOculto}>
                            <Link  to="/productos" className={style.desplieguebtn}>Todos</Link> 
                            {categorias.map(cat => (
                                <Link key={cat._id} to={`/productos/categoria/${cat.slug}`} className={style.desplieguebtn}> {cat.nombre} </Link>
                            ))}    
                            {categorias.length === 0 && (
                            <span className={style.desplieguebtn}>Sin categorías</span>
                            )}
                        </div>
                    </div>       
                    <div>
                        <Link  to="/misCompras" className={style.desplieguebtn}>Mis compras</Link>
                    </div>                          
                    <div className={style.carritoContainer}>
                        <button className={style.carrito}onClick={allCarrito}>
                            <AiOutlineShoppingCart />
                            {totalItems > 0 && (
                            <span className={style.underCarrito}>{totalItems}</span>
                            )}
                        </button>
                        {open && (
                            <div className={style.dropdown}>
                                {carrito.length === 0 ? (
                                <p className={style.vacio}>Carrito vacío</p>
                                ) : (
                                <>
                                    {carrito.map((producto, index) => (
                                    <div key={index} className={style.item}>
                                        <img src={producto.url} alt={producto.nombre} className={style.imgCarrito} />
                                        <div className={style.info}>
                                            <span>{producto.nombre}</span>
                                            <span>${producto.precio}</span>
                                        </div>
                                        <div className={style.cantidad}>
                                            <button onClick={() => restarCantidad(producto._id)}>-</button>
                                            <span>{producto.cantidad}</span>
                                            <button onClick={() => sumarCantidad(producto._id)}>+</button>
                                        </div>
                                        <button className={style.eliminar} onClick={() => eliminarDelCarrito(producto._id)} > ✕ </button>
                                    </div>
                                    ))}
                                    <div className={style.footerCarrito}>
                                    <div className={style.total}>
                                        <strong>Total:</strong>
                                        <strong>${total}</strong>
                                    </div>
                                    <Link to="/comprar" className={style.comprar}> Comprar </Link>
                                    </div>
                                </>
                                )}
                            </div>
                            )}
                    </div>
                    <button className={style.cerrarSesion} onClick={cerrarSesion}>Cerrar sesion</button>
                </div>
            </div>
        </nav>
    )
}

export default NavBarCliente;