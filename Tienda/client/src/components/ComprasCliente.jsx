import { Link } from "react-router-dom"
import style from '../css/ComprasCliente.module.css'

const comprasCliente = () =>{
    return (
        <div>
            <Link  to="/comprasRealizadas" className={style.a}>Compras realizadas</Link>
            <Link  to="/comprasEnCurso" className={style.b}>Compras en curso</Link>
        </div>
    )
}
export default comprasCliente;