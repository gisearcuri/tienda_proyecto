import { Link } from "react-router-dom"
import style from '../css/NavBarLogin.module.css';
/*import { AiOutlineShoppingCart } from "react-icons/ai";*/
import { HiOutlineShoppingBag } from "react-icons/hi2";
/*import { FaHeart } from "react-icons/fa6";*/
import { useEffect, useState } from "react";
import axios from "axios";

const NavBarLogin = ({ carrito,totalItems, eliminarDelCarrito, sumarCantidad, restarCantidad }) => {
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
        .get("http://localhost:8000/api/categorias")
        .then(res => setCategorias(res.data))
        .catch(err => console.error("Error al traer categorías", err));
    }, []);

    return(
        <nav>
            <div className={style.navBar}>
                <div className={style.logo}>
                    <Link className={style.home} to="/home">Nombre+logo</Link>
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
                    <div className={style.despliegue}>
                        <div className={style.menuOculto}>
                            <Link  to="/login" className={style.desplieguebtn}>Iniciar sesion</Link>
                            <Link  to="/registro" className={style.desplieguebtn}>Registrarse</Link>         
                        </div>
                        <button className={style.ingresar}>Ingresar</button>  
                    </div>
                    {/*<div className={style.deseos}>
                        <FaHeart></FaHeart>  
                    </div> */}
                    <div className={style.carritoContainer}>
                        <button className={style.carrito}onClick={allCarrito}>
                            {/*<AiOutlineShoppingCart />*/
                            <HiOutlineShoppingBag />
                            /* totalItems > 0 && (
                            <span className={style.underCarrito}>
                            {totalItems}
                            </span>
                        )*/}
                        </button>
                        {open && (
                            <div className={style.dropdown}>
                                {carrito.length === 0 ? (
                                <p className={style.vacio}>Carrito vacío</p>
                                ) : (
                                <>
                                    <p className={style.pedido}>Mi pedido</p>
                                        <div className={style.subtotal}>
                                            <p>Subtotal : </p>
                                            <p>$ {total}</p>
                                        </div>
                                    {carrito.map((producto, index) => (
                                    
                                    <div key={index} className={style.item}>
                                        <img src={producto.url} alt={producto.nombre} className={style.imgCarrito} />
                                        <div className={style.info}>
                                            <span>{producto.nombre}</span>
                                            <span>${producto.precio}</span>
                                        </div>
                                        <div className={style.cantidad}>
                                            <button className={style.btnCantidad} onClick={() => restarCantidad(producto._id)}>-</button>
                                            <span>{producto.cantidad}</span>
                                            <button className={style.btnCantidad} onClick={() => sumarCantidad(producto._id)}>+</button>
                                        </div>
                                        <button className={style.eliminar} onClick={() => eliminarDelCarrito(producto._id)}> ✕ </button>
                                    </div>
                                    ))}
                                    <div className={style.footerCarrito}>
                                    <p className={style.envG}>Te faltan ${} para obtener envío gratis.</p>
                                    <Link to="/comprar" className={style.comprar}> Comprar </Link>
                                    </div>
                                </>
                                )}
                            </div>
                            )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBarLogin;