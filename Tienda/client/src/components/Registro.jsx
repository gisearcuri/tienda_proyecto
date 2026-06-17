import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from '../css/Registro.module.css'


const Registro = ({setLogin}) =>{
    const navigate = useNavigate()
    const [state, setState] = useState({
        nombre : '',
        apellido : '',
        email : '',
        contrasena : '',
        confirmarContrasena : ''
    })

        const [errors, setErrors] = useState({})

        const updateState = (e) =>{
        setState({...state, [e.target.name] : e.target.value})
    }

    const registroUsuario = (e)=>{
        e.preventDefault()
        const URL = 'http://localhost:8000/api/usuarios/nueva'
        axios.post(URL,state).then(
            response => {
                localStorage.setItem("token",response.data.token)
                setLogin(true)
                setErrors({})
                navigate('/productos')
            }
        ).catch(e=> setErrors(e.response.data.errors))
    }

    return(
        <div className={style.body}>                
                <div className={style.cardRegistro}>
                    <h3>Registrate y obtene promociones imperdibles</h3>
                    <form onSubmit={e => registroUsuario(e)}>
                        <div >
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="nombre" className="form-control" id="nombre" name="nombre"value={state.nombre} onChange={(e)=> updateState(e)}></input>
                            {errors.nombre  && <p style={{color : "red"}}>{errors.nombre}</p>}
                        </div>
                        <div >
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input type="apellido" className="form-control" id="apellido" name="apellido"value={state.apellido} onChange={(e)=> updateState(e)}></input>
                            {errors.apellido && <p style={{color : "red"}}>{errors.apellido}</p>}
                        </div>
                        <div >
                            <label htmlFor="email" className="form-label">Email </label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email"value={state.email} onChange={(e)=> updateState(e)}></input>
                            {errors.email  && <p style={{color : "red"}}>{errors.email}</p>}
                        </div>
                        <div >
                            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name="contrasena"value={state.contrasena} onChange={(e)=> updateState(e)}></input>
                            {errors.contrasena  && <p style={{color : "red"}}>{errors.contrasena}</p>}
                        </div>
                        <div >
                            <label htmlFor="confirmarContrasena" className="form-label">Confirmar contraseña</label>
                            <input type="password" className="form-control" id="confirmarContrasena" name="confirmarContrasena"value={state.confirmarContrasena} onChange={(e)=> updateState(e)}></input>
                            {errors.confirmarContrasena  && <p style={{color : "red"}}>{errors.confirmarContrasena}</p>}
                        </div>
                    <button type="submit" className={style.btnRegistrarse}>Registrarse</button>
                </form>
            </div>
        </div>

    )
    

}

export default Registro;