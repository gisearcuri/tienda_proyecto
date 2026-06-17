import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'   // <-- import bootstrap here
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // optional, for JS components like modals
import style from '../css/NavBarAdmin.module.css';
import { useEffect, useState } from "react";
import axios from "axios";


const NavBarAdmin = ({cerrarSesion}) => {
    const [categorias, setCategorias] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/categoria")
        .then(res => setCategorias(res.data))
        .catch(err => console.error("Error al traer categorías", err));
    }, []);
    return(
        <nav className={style.navbar}>
            <div className={style.logo}>
                <h1>Nombre+logo</h1>
            </div>
                <div className={style.despliegue}>
                    <button className={style.ingresar}>Productos</button>
                    <div className={style.menuOculto}>
                        <Link  to="/productosAdmin" className={style.desplieguebtn}>Todos</Link> 
                        {categorias.map(cat => (
                        <Link key={cat._id} to={`/productos/categoria/${cat._id}`} className={style.desplieguebtn}> {cat.nombre} </Link>
                        ))}    
                        {categorias.length === 0 && (
                        <span className={style.desplieguebtn}>Sin categorías</span>
                        )}                         
                    </div>                    
                </div>   
            <div className={style.navLinks}>
                <Link className="navbar-brand" to="/productos/nueva">Agregar producto</Link>                
            </div>
            <Link to="/categoriasAdmin" className={style.categorias}>Categorias</Link>
            <button className={style.cerrarSesion} onClick={cerrarSesion}>Cerrar sesion</button>

        </nav>
    )
}

export default NavBarAdmin;