import style from '../css/Promociones.module.css';
const Promociones = () =>{
    const url = "https://misitio.com/promo.jpg"
    const nombre = "Promos "
    
    return (
        <section className={style.hero}>
            <div className={style.contenido}>
                <h1>30% OFF</h1>
                <p>En productos seleccionados</p>

                <button className={style.btnPromos}>VER PROMOCIONES</button>
            </div>
        </section>
    )
}

export default Promociones;