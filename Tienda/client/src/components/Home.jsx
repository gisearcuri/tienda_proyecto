
import Productos from '../components/Productos'
import Promociones from './Promociones';


const Home = ({ listaProductos, onAgregar }) =>{


    return (
        <>
            <Promociones></Promociones>
            <Productos  listaProductos={listaProductos} onAgregar={onAgregar}/>
        </>
    )

}

export default Home;