import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductosPorCategoria } from "../api/productos.api";
import { AiOutlineShoppingCart } from "react-icons/ai";

const ProductosPorCategorias = ({ onAgregar }) => {
    const { slug } = useParams();
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getProductosPorCategoria(slug).then(setProductos);
    }, [slug]);

    return (
        <>
        {productos.map(p => (
            <div key={p._id}>
            <h4>{p.nombre}</h4>
            </div>
        ))}
        </>
    );
    };

export default ProductosPorCategorias;