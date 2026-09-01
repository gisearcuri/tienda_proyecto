import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import style from '../css/EditarProducto.module.css'

const EditarProducto = ({ listaProductos, setListaProductos, cerrarSesion }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const buscaProdXid = listaProductos.find((producto) => producto._id === id);

    const [state, setState] = useState({
        nombre : "",
        descripcion : "",
        url : [],
        precio : "",
        cantidad : "",
        codigo : "",
        categoria: ""
    });

    const [categorias, setCategorias] = useState([]);

    const [error, setError] = useState({});

    useEffect(() => {
        if (!buscaProdXid)
        return; 
        setState({
            nombre : buscaProdXid.nombre,
            descripcion : buscaProdXid.descripcion,
            cantidad : buscaProdXid.cantidad,
            url : buscaProdXid.url,
            precio : buscaProdXid.precio,
            codigo : buscaProdXid.codigo,
            categoria: buscaProdXid.categoria
        });
    }, [buscaProdXid]);
    useEffect(() => {
        if (!buscaProdXid) {
            navigate("/productos");
        }
    }, [buscaProdXid, navigate]);

    useEffect(() => {
    axios.get("http://localhost:8000/api/categorias")
        .then(response => {
            setCategorias(response.data);
        })
        .catch(error => {
            console.log("Error al obtener categorías:", error);
        });
    }, []);

    const updateData = (e) => {
        e.preventDefault();
        const URL = `http://localhost:8000/api/productos/${id}`;

        axios.put(
            URL,
            state,
            {
                headers: {
                    token_usuario: localStorage.getItem("token")
                }
            }
        )
        .then(response => {
            const nuevaLista = listaProductos.map((productos) =>
                productos._id === id ? response.data : productos
            );
            setListaProductos(nuevaLista);

            navigate(`/productos/${id}`);
        })
        .catch(
            e => {
                console.log("ERROR COMPLETO:", e.response.data);
                if (e.status === 401){
                cerrarSesion()
                }    setError(e.response.data.errors);
        });
    };

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    return (
        <div className={style.body}>
            <div className={style.cardEditar}>
                <h2>Actualizar Producto</h2>
                <form onSubmit={updateData} className={style.form}>
                    <div className={style.formGroup}>
                        <label>Nombre</label>
                        <input
                        type="text"
                        name="nombre"
                        value={state.nombre}
                        onChange={handleChange}
                        />
                        {error.nombre && <p className="error">{error.nombre}</p>}
                    </div>

                    <div className={style.formGroup}>
                        <label>Descripción</label>
                        <input
                        type="text"
                        name="descripcion"
                        value={state.descripcion}
                        onChange={handleChange}
                        />
                        {error.descripcion && <p className="error">{error.descripcion}</p>}
                    </div>

                    <div className={style.formGroup}>
                        {state.url && (
                        <img
                            src={state.url}
                            alt={state.nombre}
                            className="preview-image"
                        />
                        )}
                        <label>URL de imagen</label>
                        <input
                        type="text"
                        name="url"
                        value={state.url}
                        onChange={handleChange}
                        />
                        {error.url && <p className="error">{error.url}</p>}
                    </div>

                    <div className={style.formGroup}>
                        <label>Precio</label>
                        <input
                        type="text"
                        name="precio"
                        value={state.precio}
                        onChange={handleChange}
                        />
                        {error.precio && <p className="error">{error.precio}</p>}
                    </div>

                    <div className={style.formGroup}>
                        <label>Cantidad</label>
                        <input
                        type="text"
                        name="cantidad"
                        value={state.cantidad}
                        onChange={handleChange}
                        />
                        {error.cantidad && <p className="error">{error.cantidad}</p>}
                    </div>

                    <div className={style.formGroup}>
                        <label>Código</label>
                        <input
                        type="text"
                        name="codigo"
                        value={state.codigo}
                        onChange={handleChange}
                        />
                        {error.codigo && <p className="error">{error.codigo}</p>}
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="categoria">Categoría</label>

                        <select id="categoria"name="categoria"value={state.categoria}onChange={handleChange}className={style.input}>
                            <option value="">Seleccionar categoría</option>
                            {categorias.map(cat => (
                            <option key={cat._id} value={cat._id}>
                                {cat.nombre}
                            </option>
                            ))}
                        </select>
                        {error.categoria && (
                            <p className={style.error}>{error.categoria}</p>
                        )}
                    </div>
                    <button type="submit" className={style.btnGuardar}>
                        Guardar cambios
                    </button>
                </form>
            </div>
            
        </div>
    );
};

export default EditarProducto;