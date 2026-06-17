import express from 'express'
import dotenv from 'dotenv'
import toConnectToBd from './config/database.js'
import usuarioRuta from './rutas/usuarios.ruta.js'
import cors from 'cors'
import rutasProductos from './rutas/productos.ruta.js'
import comprasRuta from './rutas/compras.ruta.js'
import rutasPromociones from "./rutas/promociones.ruta.js";
import rutasCategorias from './rutas/categorias.ruta.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());


toConnectToBd();    


app.use('/api/productos', rutasProductos)
app.use('/api/usuarios', usuarioRuta)
app.use("/api/compras", comprasRuta);
app.use("/api/promociones", rutasPromociones);
app.use("/api/categorias", rutasCategorias);

app.listen(PORT,()=>{
    console.log(`The server is up and running on port ${PORT}`)
})