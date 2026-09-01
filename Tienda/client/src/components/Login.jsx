import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import style from '../css/Login.module.css';
import {Link} from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = ({setLogin}) => {
    const [state, setState] = useState({
        email : '',
        contrasena : ''
    })
    const [errors, setErrors] = useState({})

    const [mostrarContrasena, setMostrarContrasena] = useState(false);

    const navigate = useNavigate();

    const updateState = (e) =>{
        setState({...state, [e.target.name] : e.target.value})
    }
    
    const loginProcess = (e) =>{
        e.preventDefault();
        const URL = 'http://localhost:8000/api/usuarios/login'
        axios.post(URL,state).then(
            response => {
                const token = response.data.token
                localStorage.setItem("token", token)
                
                const usuarioDecodificado = jwtDecode(token);
                console.log("USUARIO DECODIFICADO:", usuarioDecodificado);
                setLogin(usuarioDecodificado);
                setErrors({});

                if (usuarioDecodificado.role === "administrador"){
                    navigate('/productosAdmin');
                } else{
                    navigate('/productos')
                }
                
            }
        ).catch(e => {
            console.log("ERROR DEL LOGIN:", e);
            console.log("RESPUESTA DEL SERVIDOR:", e.response?.data);

            setErrors(e.response?.data?.errors || {});
        });
    }
    return (
        <div className={style.body}>            
            <div className={style.cardIngresar}>
                <h3 className={style.titulo}>Inicia sesion y enterate de las novedades</h3>
                <form onSubmit={e => loginProcess(e)}>
                    <div>
                        <label htmlFor="email" className="form-label">Email </label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email"value={state.email} onChange={(e)=> updateState(e)}></input>
                        {errors.email  && <p style={{color : "red"}}>{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="exampleInputPassword1" className="form-label"> Contraseña </label>
                        <div className={style.contenedorPassword}>
                            <input type={mostrarContrasena ? "text" : "password"} className="form-control" id="exampleInputPassword1" name="contrasena" value={state.contrasena} onChange={(e) => updateState(e)} />
                            <button type="button" className={style.botonPassword} onClick={() => setMostrarContrasena(!mostrarContrasena)} > {mostrarContrasena ? <FaEyeSlash /> : <FaEye />} </button>
                        </div>
                        {errors.contrasena && (
                            <p style={{ color: "red" }}>{errors.contrasena}</p>
                        )}
                    </div>
                    <p>Todavia no tenes cuenta?<Link to={`/registro`} className={style.links}>Registrate</Link></p>
                    <Link to={``} className={style.links}>¿Olvidaste tu contraseña?</Link>
                    <button type="submit" className={style.btnIngresar}>Iniciar sesion</button>                   
                </form>
            </div>
        </div>
    )
}
export default Login;