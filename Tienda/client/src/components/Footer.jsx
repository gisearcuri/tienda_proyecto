import { Link } from 'react-router-dom';
import style from '../css/Footer.module.css'

const Footer = () =>{
    return (
        <>
        <footer className={style.footer}>
            <div className={style.contacto}>
                <Link to={``}className={style.links}>1159242220</Link>
                <Link to={``}className={style.links}>unemaildecontacto@mail.com</Link>
                <Link to={``}className={style.links}>Direccion 123, Cuidad, Provincia.</Link>
            </div>
            <div className={style.pagos}>
                <Link to={``}className={style.links}>Medios de pago</Link>
                <Link to={``}className={style.links}>Boton de arrepentimiento</Link>
            </div>
            <div className={style.defensa}>
                <Link to={``}className={style.links}>Defensa al consumidor</Link>
            </div>
        </footer>
        <footer>
            <div className={style.firma}>
                <Link to={``}className={style.firma}>Powered by ALGIMA</Link>
            </div>
        </footer>
        </>
    )
}

export default Footer;