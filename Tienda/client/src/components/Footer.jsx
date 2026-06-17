import style from '../css/Footer.module.css'

const Footer = () =>{
    return (
        <>
        <footer className={style.footer}>
            <div className={style.contacto}>
                <p>1159242220</p>
                <p>unemaildecontacto@mail.com</p>
                <p>Direccion 123, Cuidad, Provincia.</p>
            </div>
            <div className={style.pagos}>
                <p>Medios de pago</p>
            </div>
            <div className={style.defensa}>
                <p>Defensa al consumidor</p>
            </div>
        </footer>
        <footer>
            <div>Sitio web creado por Gisela Arcuri</div>
        </footer>
        </>
    )
}

export default Footer;