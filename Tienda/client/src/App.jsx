import { useState } from 'react'
import { Routes , Route , Navigate} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Productos from './components/Productos'
import Producto from './components/Producto'
import NavBarLogin from './components/NavBarLogin'
import 'bootstrap/dist/css/bootstrap.min.css'   
import 'bootstrap/dist/js/bootstrap.bundle.min.js' 
import FormularioProductos from './components/Formulario'
import EditarProducto from './components/EditarProducto'
import Login from './components/Login'
import Registro from './components/Registro'
import Home from './components/Home'
import Administrador from './components/Administrador'
import ProductosAdmin from './components/ProductosAdmin'
import Footer from './components/Footer'
import NavBarAdmin from './components/NavBarAdmin'
import NavBarCliente from './components/NavBarCliente'
import ProductoAdmin from './components/ProductoAdmin'
import Comprar from './components/Comprar'
import AdminCategorias from './components/AdminCategorias'
import { getProductos } from "./api/productos.api";
import ComprasCliente from './components/ComprasCliente'


function App() {
  const [login, setLogin] = useState(null)
  const [listaProductos, setListaProductos] = useState([]);
  const navigate = useNavigate();
  const cerrarSesion = () =>{
    localStorage.removeItem("token")
    setLogin(false)
    navigate('/login')
  }
  const [carrito, setCarrito] = useState(() => {
  const carritoGuardado = localStorage.getItem('carrito')
  return carritoGuardado ? JSON.parse(carritoGuardado) : []
  })
  useEffect(() => {
    getProductos().then(setListaProductos);
  }, []);
  useEffect(() => {
  localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(p => p._id === producto._id)

      if (existe) {
        return prev.map(p =>
          p._id === producto._id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        )
      }

      return [...prev, { ...producto, cantidad: 1 }]
    })
  }
  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(p => p._id !== id));
  };
  const sumarCantidad = (id) => {
  setCarrito(prev =>
    prev.map(p =>
      p._id === id
        ? { ...p, cantidad: p.cantidad + 1 }
        : p
    )
  );
};
  const restarCantidad = (id) => {
  setCarrito(prev =>
    prev
      .map(p =>
        p._id === id
          ? { ...p, cantidad: p.cantidad - 1 }
          : p
      )
      .filter(p => p.cantidad > 0)
  );
};
const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);


  return (
    <>
      {!login && <NavBarLogin carrito={carrito} totalItems={totalItems} eliminarDelCarrito={eliminarDelCarrito} sumarCantidad={sumarCantidad} restarCantidad={restarCantidad}/>}

      {login?.role === "usuario" && (
        <NavBarCliente carrito={carrito} totalItems={totalItems} cerrarSesion={cerrarSesion} eliminarDelCarrito={eliminarDelCarrito} sumarCantidad={sumarCantidad}restarCantidad={restarCantidad} />
      )}

      {login?.role === "administrador" && (
        <NavBarAdmin cerrarSesion={cerrarSesion} />
      )}
      
      <Routes>

        < Route  path='/' element={ < Navigate to="/home" />}></Route>
        < Route  path='/login' element={< Login setLogin={setLogin} />}/>
        < Route  path='/registro' element={<Registro setLogin={setLogin}  />}/>

        {/* Cliente */}
        < Route  path='/home' element={ < Home listaProductos={listaProductos} onAgregar={agregarAlCarrito} />}></Route>
        < Route  path='/productos' element={ < Productos listaProductos={listaProductos} login={login} setLogin={setLogin} onAgregar={agregarAlCarrito}/> }></Route>
        < Route  path="/productos/categoria/:slug" element={<Productos onAgregar={agregarAlCarrito} />} />
        < Route  path='/productos/:id' element={ < Producto listaProductos={listaProductos} setListaProductos={setListaProductos} onAgregar={agregarAlCarrito} />}></Route>
        < Route  path='/comprar' element={ < Comprar carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} sumarCantidad={sumarCantidad}restarCantidad={restarCantidad}/>} />
        < Route  path='/misCompras' element={ < ComprasCliente ></ComprasCliente> } />

        {/* Administrador */}
        < Route  path='/administrador' element={< Administrador listaProductos={listaProductos} setListaProductos={setListaProductos} ></Administrador>}></Route>
        < Route  path='/productosAdmin' element={< ProductosAdmin listaProductos={listaProductos} setListaProductos={setListaProductos}></ProductosAdmin>}></Route>
        < Route  path='/productos/update/:id' element={ <EditarProducto listaProductos={listaProductos} setListaProductos={setListaProductos} cerrarSesion={cerrarSesion}/> }></Route>
        < Route  path='/productosAdmin/:id' element={ < ProductoAdmin listaProductos={listaProductos} setListaProductos={setListaProductos} cerrarSesion={cerrarSesion}/>}></Route>
        < Route  path='/productos/nueva' element={ < FormularioProductos listaProductos={listaProductos} setListaProductos={setListaProductos} cerrarSesion={cerrarSesion} />}></Route>
        < Route  path='/categoriasAdmin' element={ <AdminCategorias></AdminCategorias>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
