import { Link } from "react-router-dom";

const Categorias = ({ categorias }) => {
    return (
        <ul>
        {categorias.map(cat => (
            <li key={cat._id}>
            <Link to={`/productos/categoria/${cat.slug}`}>
                {cat.nombre}
            </Link>
            </li>
        ))}
        </ul>
    );
};

export default Categorias;