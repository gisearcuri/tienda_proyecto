import { useEffect, useState } from "react";
import axios from "axios";
import style from "../css/AdminCategorias.module.css"

const AdminCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");
    const [error, setError] = useState("");

    const API_URL = "http://localhost:8000/api/categorias";

    // 🔹 Obtener categorías
    const ObtenerCategorias = async () => {
        try {
        const res = await axios.get(API_URL);
        setCategorias(res.data);
        } catch (err) {
        setError("Error al cargar categorías");
        }
    };

    useEffect(() => {
        ObtenerCategorias();
    }, []);

    // 🔹 Crear categoría
    const crearCategoria = async (e) => {
        e.preventDefault();
        setError("");

        if (!nombre.trim()) {
        setError("El nombre es obligatorio");
        return;
        }

        try {
        await axios.post(API_URL, { nombre });
        setNombre("");
        ObtenerCategorias();
        } catch (err) {
        setError(
            err.response?.data?.error || "No se pudo crear la categoría"
        );
        }
    };

    // 🔹 Eliminar categoría
    const eliminarCategoria = async (id) => {
        if (!window.confirm("¿Eliminar categoría?")) return;

        try {
        await axios.delete(`${API_URL}/${id}`);
        ObtenerCategorias();
        } catch (err) {
        alert(
            err.response?.data?.message ||
            "No se pudo eliminar la categoría"
        );
        }
    };

    return (
        <div className={style.body}>
            <h2>Administrar Categorías</h2>
            <form onSubmit={crearCategoria}>
                <input type="text" placeholder="Nueva categoría" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <button type="submit" className={style.agregar}>Agregar</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul >
                {categorias.map((cat) => (
                <li key={cat._id}className={style.listaCat}>
                    {cat.nombre} 
                    <button onClick={() => eliminarCategoria(cat._id)} className={style.btnEliminar}>Eliminar</button>                  
                </li>
                
                ))}
            </ul>
        </div>
    );
};

export default AdminCategorias;