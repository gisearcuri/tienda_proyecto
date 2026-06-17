import {Link} from 'react-router-dom'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import style from '../css/Productos.module.css';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa6";
import { getProductos, getProductosPorCategoria } from "../api/productos.api";
import { AiFillLike } from "react-icons/ai";

const Productos = ({onAgregar}) => {
    const [listaProductos, setListaProductos] = useState([]);
    const { slug } = useParams();

    useEffect(() => {
        const cargarProductos = async () => {
        try {
            const data = slug
            ? await getProductosPorCategoria(slug)
            : await getProductos();

            setListaProductos(data);
        } catch (error) {
            console.error("Error al cargar productos", error);
        }
        };

        cargarProductos();
    }, [slug]);

    return (
        <div className={style.body}>
            {listaProductos.map((producto) => (
                <div className={style.tarjetaProducto} key={producto._id}>
                    <img className={style.tarjetaImg}src={producto.url} alt={producto.nombre} ></img>
                    <div className={style.tarjetaNombre}>
                        <h5 className={style.tarjetaTitulo}>{producto.nombre}</h5>
                        <p className={style.productoDescripcion}>{producto.descripcion}</p>
                        <p className={style.productoPrecio}>${producto.precio}</p>
                        <div className={style.botones}>
                            {/*<button className={style.meGusta}><FaHeart /></button>*/}
                            <button className={style.carrito} onClick={() => onAgregar(producto)}><AiOutlineShoppingCart /></button>
                            <Link to={`/productos/${producto._id}`} className={style.btnDetalle}>Ver detalles</Link>
                        </div>
                    </div>                       
                </div>
            ))}
        </div>
    );
};

export default Productos;