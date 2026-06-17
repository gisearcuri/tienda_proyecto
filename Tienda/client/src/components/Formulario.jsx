import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'   // <-- import bootstrap here
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // optional, for JS components like modals
import style from '../css/AgregarProducto.module.css'

const FormularioProductos = ({listaProductos, setListaProductos , cerrarSesion}) =>{
    const [data, setData] = useState({
        nombre : "",
        descripcion : "",
        url : "",
        precio : "",
        codigo : "",
        cantidad : "",
        categoria: "" 
    })
    const [errors, setErrors] = useState(
        {
        
        }
    )
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/categorias")
            .then(res => {
                setCategorias(res.data);
            })
            .catch(() => {
                console.log("Error al cargar categorías");
            });
    }, []);

    const updateState = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const agregarProducto = (e) =>{
        e.preventDefault();
        if (!data.categoria) {
            setErrors({ categoria: "Seleccioná una categoría" });
        return;
    }
    setErrors({});
        const URL = 'http://localhost:8000/api/productos'


        axios.post(URL,data, {headers: { token_usuario: localStorage.getItem("token") }}).then(
            response => {
                setListaProductos([...listaProductos, response.data])
                navigate('/productosAdmin')
            }
        ).catch (
            e => {
                console.log("ERROR COMPLETO:", e.response.data);
                if (e.status === 401){
                cerrarSesion()
                }    setErrors(e.response.data.errors);
    });
    }

    return(
        <div className={style.body}>
            <div className={style.cardAgregarProducto}>
                <h2>Agregar producto</h2>
                <form onSubmit={(e) => agregarProducto(e)} className={style.form}>
                    <div className={style.formGroup}>
                        <label htmlFor="nombre" className="form-label">Nombre del producto</label>
                        <input type="text" className="form-control" id="nombre" name="nombre" value={data.nombre} onChange={(e)=>{updateState(e)}}/>
                        {errors?.nombre  && <p style={{color : "red"}}>{errors.nombre}</p>}
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="descripcion" className="form-label">Describe el producto</label>
                        <input type="text" className="form-control" id="descripcion" name="descripcion" value={data.descripcion} onChange={(e)=>{updateState(e)}}/>
                        {errors?.descripcion  && <p style={{color : "red"}}>{errors.descripcion}</p>}
                    </div>
                    <div className={style.formGroup}>
                        {data.url && (
                        <img src={data.url} alt={data.nombre} className="preview-image"/>
                        )}
                        <label htmlFor="url" className="form-label">URL</label>
                        <input type="text" className="form-control" id="url" name="url"  value={data.url} onChange={(e)=>{updateState(e)}}/>
                        {errors?.url  && <p style={{color : "red"}}>{errors.url}</p>}
                    </div>
                    <div className={style.formGroup}>
                        <label>Precio</label>
                        <input type="text" name="precio" value={data.precio} onChange={(e)=>{updateState(e)}}/>
                        {errors.precio && <p style={{color : "red"}}>{errors.precio}</p>}
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="codigo" className="form-label">Codigo del producto</label>
                        <input type="text" className="form-control" id="codigo" name="codigo" value={data.codigo} onChange={(e)=>{updateState(e)}}/>
                        {errors?.codigo  && <p style={{color : "red"}}>{errors.codigo}</p>}
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="cantidad" className="form-label">Cantidad</label>
                        <input type="text" className="form-control" id="cantidad" name="cantidad" value={data.cantidad} onChange={(e)=>{updateState(e)}}/>
                        {errors?.cantidad  && <p style={{color : "red"}}>{errors.cantidad}</p>}
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="categoria">Categoría</label>

                        <select id="categoria"name="categoria"value={data.categoria}onChange={updateState}className={style.input}>
                            <option value="">Seleccionar categoría</option>
                            {categorias.map(cat => (
                            <option key={cat._id} value={cat._id}>
                                {cat.nombre}
                            </option>
                            ))}
                        </select>
                        {errors?.categoria && (
                            <p className={style.error}>{errors.categoria}</p>
                        )}
                        </div>
                    <button type="submit" className={style.agregarProducto} onChange={(e)=>{updateState(e)}}>Agregar producto</button>
                </form>
            </div>            
        </div>
            
    )
}

export default FormularioProductos;